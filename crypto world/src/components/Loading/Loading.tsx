import "./Loading.css";
export default function Loading() {
  return (
    <div className="flex flex-col space-y-5 main">
      <div className="jumpy-bars">
        <div className="bar" id="bar1"></div>
        <div className="bar" id="bar2"></div>
        <div className="bar" id="bar3"></div>
        <div className="bar" id="bar4"></div>
        <div className="bar" id="bar5"></div>
        <div className="bar" id="bar6"></div>
        <div className="bar" id="bar7"></div>
      </div>
      <h1 className="text-3xl"> Loading...</h1>
    </div>
  );
}
