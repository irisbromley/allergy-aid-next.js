export default function BodyPartLabel(props: { bodyPart: string }) {
  const bodyPartLabels: Record<string, string> = {
    eyes: '👁 Eyes',
    nose: '👃 Nose',
    mouth: '👄 Mouth',
    lungs: '🫁 Lungs',
    skin: ' 🦵 Skin',
  };

  return (
    <div>
      {bodyPartLabels[props.bodyPart] ??
        props.bodyPart}
    </div>
  );
}
