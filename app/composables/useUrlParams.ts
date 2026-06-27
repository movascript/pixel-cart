import type { UnwrapNestedRefs } from "vue";

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

    if (value === null || value === "") return null;
    return String(value);
  };

  const readFromUrl = (key: keyof T): T[keyof T] => {
    const raw = route.query[key as string];
    if (raw == null) return defaults[key];

    const rawStr = Array.isArray(raw) ? (raw[0] ?? "") : raw;
    return parse(key, rawStr as string);
  };

  const state = reactive(
    Object.fromEntries(keys.map((k) => [k, readFromUrl(k)])),
  ) as any as T;

  watch(
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

      router.replace({ query });
    },
    { deep: true },
  );

  return state as UnwrapNestedRefs<T>;
}
