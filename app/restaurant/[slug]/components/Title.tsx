interface Props {
  name: string;
}

export default function Title({ name }: Props) {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{name}</h1>
    </div>
  );
}
