import type { UnwrapNestedRefs } from "vue";

// Track multiple URL search params as a single reactive object.
export function useUrlParams<T extends Record<string, string | string[]>>(
  defaults: T,
): UnwrapNestedRefs<T> {
  const router = useRouter();
  const route = useRoute();
  const keys = Object.keys(defaults) as (keyof T)[];

  const isArrayKey = (key: keyof T) => Array.isArray(defaults[key]);

  const parse = (key: keyof T, raw: string): T[keyof T] => {
    if (isArrayKey(key)) {
      return (raw ? raw.split(",") : []) as T[keyof T];
    }
    return raw as T[keyof T];
  };

  const serialize = (key: keyof T, value: T[keyof T]): string | null => {
    if (isArrayKey(key)) {
      const arr = value as unknown as string[];
      return arr.length ? arr.join(",") : null;
    }
    if (value === null || value === ("" as unknown)) return null;
    return String(value);
  };

  const readFromUrl = (key: keyof T): T[keyof T] => {
    const raw = route.query[key as string];
    if (raw == null) return defaults[key];
    const rawStr = Array.isArray(raw) ? (raw[0] ?? "") : raw;
    return parse(key, rawStr as string);
  };

  const reactiveState = reactive(
    Object.fromEntries(keys.map((k) => [k, readFromUrl(k)])),
  ) as any as T;
  const state = reactiveState as T;

  let suppressNextUrlSync = false;

  // state -> URL
  const stopStateToUrl = watch(
    () => keys.map((k) => state[k]),
    () => {
      const query = { ...route.query };
      for (const key of keys) {
        const serialized = serialize(key, state[key]);
        if (serialized === null) {
          delete query[key as string];
        } else {
          query[key as string] = serialized;
        }
      }
      suppressNextUrlSync = true;
      router.replace({ query });
    },
    { deep: true },
  );

  // URL -> state
  const stopUrlToState = watch(
    () => keys.map((k) => route.query[k as string]),
    () => {
      if (suppressNextUrlSync) {
        suppressNextUrlSync = false;
        return;
      }
      for (const key of keys) {
        state[key] = readFromUrl(key);
      }
    },
  );

  // Stop both watchers once this component starts unmounting, so navigating away doesn't reset state to defaults mid-transition
  onBeforeUnmount(() => {
    stopStateToUrl();
    stopUrlToState();
  });

  return reactiveState as UnwrapNestedRefs<T>;
}
