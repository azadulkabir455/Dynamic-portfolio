export function getNoRotationTransform(transformStr: string): string {
  const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
  if (hasRotate) {
    return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
  } else if (transformStr === "none") {
    return "rotate(0deg)";
  } else {
    return `${transformStr} rotate(0deg)`;
  }
}

export function getPushedTransform(baseTransform: string, offsetX: number): string {
  const translateRegex = /translate\(([-0-9.]+)px\)/;
  const match = baseTransform.match(translateRegex);
  if (match) {
    const currentX = parseFloat(match[1]);
    const newX = currentX + offsetX;
    return baseTransform.replace(translateRegex, `translate(${newX}px)`);
  } else {
    return baseTransform === "none"
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`;
  }
}
