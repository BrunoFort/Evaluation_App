import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Button from "/src/components/ui/Button.jsx";;
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

export default function DateSelector({ 
  value, 
  onChange, 
  label,
  mode = 'dropdown', // 'dropdown' or 'calendar'
  required = false 
}) {
  const [day, setDay] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');

  React.useEffect(() => {
    if (value) {
      const [y, m, d] = value.split('-');
      setYear(y);
      setMonth(m);
      setDay(d);
    }
  }, [value]);

  const handleDropdownChange = () => {
    if (day && month && year) {
      onChange(`${year}-${month}-${day.padStart(2, '0')}`);
    }
  };

  React.useEffect(() => {
    handleDropdownChange();
  }, [day, month, year]);

  if (mode === 'calendar') {
    return (
      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white border-slate-200"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value ? format(new Date(value), 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              onSelect={(date) => date && onChange(format(date, 'yyyy-MM-dd'))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-slate-700 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="grid grid-cols-3 gap-2">
        <Select value={day} onValueChange={setDay}>
          <SelectTrigger className="bg-white border-slate-200">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {days.map(d => (
              <SelectItem key={d} value={d.toString().padStart(2, '0')}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className="bg-white border-slate-200">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {months.map(m => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="bg-white border-slate-200">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {years.map(y => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
