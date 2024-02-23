import { useState } from "react";
import Slider, { SliderProps } from "./Slider";
import Filter from "./Filter";

function App() {
  const positions = [0, 10, 20, 30, 40, 50];
  const [value, onChange] = useState(positions[3]);

  const [classes, setClasses] = useState<SliderProps["classes"]>({
    track: "",
    breakpointsContainer: "",
    rail: "",
    singleBreakpoint: "",
    thumb: "",
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="grid grid-cols-2 gap-4 w-[640px] mb-8 ">
        <Filter
          name="Rail Color"
          value={classes?.rail}
          onChange={(value) => setClasses({ ...classes, rail: value })}
          options={[
            { label: "Orange", value: "bg-orange-200" },
            { label: "Blue", value: "bg-blue-200" },
            { label: "Pink", value: "bg-pink-200" },
          ]}
        />
        <Filter
          name="Track Color"
          value={classes?.track}
          onChange={(value) => setClasses({ ...classes, track: value })}
          options={[
            { label: "Orange", value: "bg-orange-200" },
            { label: "Blue", value: "bg-blue-200" },
            { label: "Pink", value: "bg-pink-200" },
          ]}
        />
        <Filter
          name="Thumn Color"
          value={classes?.thumb}
          onChange={(value) => setClasses({ ...classes, thumb: value })}
          options={[
            { label: "Orange", value: "bg-orange-200" },
            { label: "Blue", value: "bg-blue-200" },
            { label: "Pink", value: "bg-pink-200" },
          ]}
        />
        <Filter
          name="Breakpoint Color"
          value={classes?.singleBreakpoint}
          onChange={(value) =>
            setClasses({ ...classes, singleBreakpoint: value })
          }
          options={[
            { label: "Orange", value: "text-orange-200" },
            { label: "Blue", value: "text-blue-200" },
            { label: "Pink", value: "text-pink-200" },
          ]}
        />
      </div>
      <div className="w-[640px] shadow-xl p-4 rounded-2xl bg-purple-200">
        <Slider
          positions={positions}
          value={value}
          onChange={onChange}
          classes={classes}
        />
      </div>
    </div>
  );
}

export default App;
