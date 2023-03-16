'use client';

type Props = {
  error: Error;
  reset: () => void;
};

export default function RootError(props: Props) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      Ups! something went wrong
      <p>{props.error.message}</p>
      <button onClick={() => props.reset()}>Reset error boundary</button>
    </div>
  );
}
