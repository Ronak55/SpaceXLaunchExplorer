export async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} – ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}
