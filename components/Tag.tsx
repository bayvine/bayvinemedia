

const Tag = ({ tag, children }: { tag?: string;  children: React.ReactNode}) => {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-slate-50 px-5 py-1 font-semibold text-black"
    >
      {tag || children}
    </span>
  );
};

export default Tag;
