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
      ? ["ఆ", "సో", "మం", "బు", "గు", "శు", "శ"]
      : language === "hi"
      ? ["र", "सो", "मं", "बु", "गु", "शु", "श"]
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const todayText =
    language === "te"
      ? "ఈ రోజు"
      : language === "hi"
      ? "आज"
      : "Today";

  // Navigation
  const prevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    onSelectDate(todayStr);
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setIsOpen(false);
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
    dayCells.push(<div key={`empty-${i}`} className="h-8 w-8" />);
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
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200 ${
          isSelected
            ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md shadow-orange-200/50 scale-105"
            : isToday
            ? "bg-orange-50 text-orange-700 ring-1 ring-orange-300 font-bold"
            : "text-stone-700 hover:bg-orange-50 hover:text-orange-600"
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
        className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 text-white transition-all duration-200 shadow-sm ${
          isOpen
            ? "bg-white/25 scale-95"
            : "bg-white/15 hover:bg-white/25 hover:scale-105"
        }`}
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
        <>
          {/* Mobile bottom drawer backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-stone-200 bg-white p-5 pb-8 shadow-2xl animate-in slide-in-from-bottom duration-300 md:absolute md:bottom-auto md:left-auto md:right-0 md:top-full md:mt-2 md:w-72 md:rounded-2xl md:border md:pb-4 md:shadow-xl md:animate-slide-down">
            {/* Drag Handle Indicator for mobile */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-stone-300 md:hidden" />

            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <span
                className="text-sm font-bold text-stone-800"
                style={{ fontFamily: "var(--font-outfit), var(--font-inter), system-ui, sans-serif" }}
              >
                {monthNames[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {weekDays.map((wd, index) => (
                <div key={`wd-${index}`} className="text-[10px] font-bold uppercase tracking-wider text-stone-400 py-1">
                  {wd}
                </div>
              ))}
            </div>

            {/* Monthly dates grid */}
            <div className="grid grid-cols-7 gap-1 justify-items-center">
              {dayCells}
            </div>

            {/* Footer actions */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
              <button
                type="button"
                onClick={goToToday}
                className="rounded-lg bg-orange-50 px-3.5 py-2 text-xs font-bold text-orange-600 transition hover:bg-orange-100"
              >
                {todayText}
              </button>
              {selectedDate && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-stone-400">
                    {selectedDate}
                  </span>
                  <button
                    type="button"
                    onClick={() => { onSelectDate(""); setIsOpen(false); }}
                    className="rounded-lg bg-red-50 px-2.5 py-1.5 text-[10px] font-bold text-red-500 transition hover:bg-red-100"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
