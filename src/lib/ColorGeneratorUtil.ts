export function ColorGeneratorUtil(k: number | undefined): string[] {

    if(!k){
        return [];
    }

    if (k <= 1) return ['#FF0000'];

    const colors: string[] = [];

    for (let i = 0; i < k; i++) {
        const ratio = i / (k - 1);
        const red = Math.round(255 * (1 - ratio));
        const green = Math.round(255 * ratio);
        const color = `#${red.toString(16).padStart(2, '0')}${green
            .toString(16)
            .padStart(2, '0')}00`;
        colors.push(color.toUpperCase());
    }

    return colors;
}