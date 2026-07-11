"use client";

import { useState, useRef, useEffect } from "react";

type CalendarDropdownProps = {
  selectedDate: string; // "YYYY-MM-DD"
  onSelectDate: (date: string) => void;
  language: string;
};

export default function CalendarDropdown({
  selectedDate,
  onSelectDate,
  language,
}: CalendarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calendar states
  const now = new Date();
  const [viewDate, setViewDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Get total days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get starting day index (0 for Sunday, 6 for Saturday)
  const startDayIndex = new Date(year, month, 1).getDay();

  // Handle outside click to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthNames =
    language === "te"
      ? [
          "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్",
          "జూలై", "ఆగస్టు", "సెప్టెంబరు", "అక్టోబరు", "నవంబరు", "డిసెంబరు"
        ]
      : language === "hi"
      ? [
          "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
          "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
        ]
      : [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];

  const weekDays =
    language === "te"
      ? ["ఆ", "సో", "మం", "बु", "గు", "శు", "శ"]
      : language === "hi"
      ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Navigation
  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (dayNum: number) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(dayNum).padStart(2, "0");
    onSelectDate(`${year}-${formattedMonth}-${formattedDay}`);
    setIsOpen(false);
  };

  // Generate calendar cells
  const dayCells = [];
  // Offset blanks
  for (let i = 0; i < startDayIndex; i++) {
    dayCells.push(<div key={`empty-${i}`} className="h-7 w-7" />);
  }
  // Days of month
  for (let d = 1; d <= daysInMonth; d++) {
    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(d).padStart(2, "0");
    const cellDateStr = `${year}-${formattedMonth}-${formattedDay}`;
    const isSelected = selectedDate === cellDateStr;
    const isToday =
      now.getFullYear() === year &&
      now.getMonth() === month &&
      now.getDate() === d;

    dayCells.push(
      <button
        key={`day-${d}`}
        type="button"
        onClick={() => handleDateSelect(d)}
        className={`h-7 w-7 rounded-full text-xs font-bold transition flex items-center justify-center ${
          isSelected
            ? "bg-orange-600 text-white"
            : isToday
            ? "bg-orange-100 text-orange-700 border border-orange-400"
            : "text-stone-700 hover:bg-stone-100"
        }`}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Calendar Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white border border-white/20 hover:bg-white/25 transition shadow-sm"
        title="Filter coverage by date"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
      </button>

      {/* Expanded Monthly Grid Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 w-64 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 transition"
            >
              ←
            </button>
            <span className="text-sm font-black text-stone-800">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 transition"
            >
              →
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xxs font-bold text-stone-400 mb-2">
            {weekDays.map((wd, index) => (
              <div key={`wd-${index}`}>{wd}</div>
            ))}
          </div>

          {/* Monthly dates grid */}
          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {dayCells}
          </div>

          {selectedDate && (
            <div className="mt-3 pt-3 border-t border-stone-100 flex justify-between items-center">
              <span className="text-xxs font-medium text-stone-500">
                Filtered: <span className="font-bold text-orange-600">{selectedDate}</span>
              </span>
              <button
                type="button"
                onClick={() => onSelectDate("")}
                className="text-xxs font-bold text-red-500 hover:text-red-700 transition"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
