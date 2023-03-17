export function DailyLogsList(props: { logs: any[] }) {
  return (
    <>
      <div>Lists</div>
      <div>
        {props.logs.map((item) => (
          <div key={`item -${item.id}`}>{item.date}</div>
        ))}
      </div>
    </>
  );
}
