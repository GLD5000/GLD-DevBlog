export default function getReadTime(markdown: string) {
  const WORDS_PER_MIN = 180;
  const words = markdown
    .replaceAll(/[^\w\s]/g, "")
    .trim()
    .split(/\s+/).length;
  const time = Math.ceil(words / WORDS_PER_MIN);
  return time;
}
