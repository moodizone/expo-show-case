export async function sleep(delay = 1500) {
  return new Promise((res) => setTimeout(res, delay));
}
