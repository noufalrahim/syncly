
interface DropIndicatorProps {
  beforeId: string | null;
  column: string;
}

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return <div data-before={beforeId || '-1'} data-column={column} className="my-0.5 h-0.5 w-full bg-violet-900 opacity-0" />;
};

export default DropIndicator;
