import React from "react";

export default function FormInputItem(props: {
  label?: any;
  type: any;
  placeHolder: any;
  value: any;
  onChange: any;
  disabled?: any;
}) {
  return (
    <React.Fragment>
      <div className="mb-4 md:w-1/2 md:pl-2 md:pr-2">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {props.label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={props.type}
          placeholder={props.placeHolder}
          value={props.value}
          onChange={(e: any) => props.onChange(e.target.value)}
          disabled={props.disabled}
        />
      </div>
    </React.Fragment>
  );
}
