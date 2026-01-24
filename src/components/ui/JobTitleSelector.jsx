import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Comprehensive list of common Canadian job titles
const canadianJobTitles = [
  "Accountant", "Administrative Assistant", "Architect", "Baker", "Bank Teller", "Barista", 
  "Business Analyst", "Carpenter", "Chef", "Civil Engineer", "Customer Service Representative",
  "Data Analyst", "Dentist", "Doctor", "Electrician", "Engineer", "Financial Analyst",
  "Graphic Designer", "Human Resources Manager", "IT Specialist", "Lawyer", "Marketing Manager",
  "Mechanical Engineer", "Nurse", "Operations Manager", "Pharmacist", "Plumber", "Project Manager",
  "Receptionist", "Registered Nurse", "Restaurant Manager", "Sales Manager", "Social Worker",
  "Software Developer", "Software Engineer", "Store Manager", "Teacher", "Truck Driver",
  "Web Developer", "Welder", "Accountant CPA", "Administrative Coordinator", "Advertising Manager",
  "Aerospace Engineer", "Agricultural Worker", "Air Traffic Controller", "Aircraft Mechanic",
  "Analyst Programmer", "Animal Care Worker", "Architect Technologist", "Automotive Technician",
  "Bank Manager", "Bookkeeper", "Brand Manager", "Building Inspector", "Bus Driver",
  "Business Development Manager", "Buyer", "Cashier", "Chemical Engineer", "Chiropractor",
  "Claims Adjuster", "Clinical Research Coordinator", "Computer Programmer", "Construction Manager",
  "Content Writer", "Controller", "Copywriter", "Counsellor", "Court Reporter", "Database Administrator",
  "Delivery Driver", "Dental Hygienist", "Design Engineer", "Dietitian", "Digital Marketing Specialist",
  "Early Childhood Educator", "E-commerce Manager", "Economist", "Editor", "Education Assistant",
  "Electrical Engineer", "Environmental Engineer", "Event Coordinator", "Executive Assistant",
  "Facilities Manager", "Fashion Designer", "Financial Planner", "Fitness Instructor", "Flight Attendant",
  "Food Service Worker", "Foreman", "Geologist", "Health and Safety Officer", "Heavy Equipment Operator",
  "Hotel Manager", "Industrial Engineer", "Information Security Analyst", "Insurance Broker",
  "Interior Designer", "Laboratory Technician", "Landscaper", "Legal Assistant", "Librarian",
  "Logistics Coordinator", "Machine Operator", "Maintenance Supervisor", "Management Consultant",
  "Manufacturing Engineer", "Market Research Analyst", "Massage Therapist", "Medical Assistant",
  "Medical Laboratory Technologist", "Mining Engineer", "Network Administrator", "Nutritionist",
  "Occupational Therapist", "Office Manager", "Optometrist", "Painter", "Paralegal", "Paramedic",
  "Personal Support Worker", "Petroleum Engineer", "Pharmacist Technician", "Photographer",
  "Physical Therapist", "Physician", "Pilot", "Plant Manager", "Plumbing Supervisor", "Police Officer",
  "Product Manager", "Production Manager", "Psychologist", "Public Relations Specialist", "Purchasing Agent",
  "Quality Assurance Manager", "Quality Control Inspector", "Radio Operator", "Real Estate Agent",
  "Recruitment Specialist", "Refrigeration Mechanic", "Registered Practical Nurse", "Research Scientist",
  "Respiratory Therapist", "Restaurant Server", "Retail Sales Associate", "Safety Coordinator",
  "Sales Representative", "School Counsellor", "Security Guard", "Sheet Metal Worker", "Shipping Clerk",
  "Social Media Manager", "Speech-Language Pathologist", "Structural Engineer", "Supply Chain Manager",
  "Surgeon", "System Administrator", "Tax Accountant", "Technical Support Specialist", "Technical Writer",
  "Telecommunications Specialist", "Tool and Die Maker", "Translator", "Transportation Manager",
  "Travel Agent", "UX Designer", "Veterinarian", "Video Editor", "Warehouse Manager", "Waiter/Waitress",
  "Web Designer", "Wellness Coordinator", "Writer"
].sort();

export default function JobTitleSelector({ value, onChange, label = "Job Title", required = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const filteredTitles = searchTerm
    ? canadianJobTitles.filter(title => 
        title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : canadianJobTitles;

  return (
    <div className="space-y-2">
      <Label className="text-slate-700 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {!showCustom ? (
        <>
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full bg-white border-slate-200">
              <SelectValue placeholder="Select or search for a job title" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <div className="p-2 sticky top-0 bg-white border-b">
                <Input
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {filteredTitles.length > 0 ? (
                filteredTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500 text-sm">
                  No matching job titles found
                </div>
              )}
            </SelectContent>
          </Select>
          <button
            type="button"
            onClick={() => setShowCustom(true)}
            className="text-xs text-blue-600 hover:text-blue-700 underline"
          >
            My job title is not listed
          </button>
        </>
      ) : (
        <>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter your job title"
            className="bg-white border-slate-200"
          />
          <button
            type="button"
            onClick={() => {
              setShowCustom(false);
              setSearchTerm('');
            }}
            className="text-xs text-blue-600 hover:text-blue-700 underline"
          >
            Select from list instead
          </button>
        </>
      )}
    </div>
  );
}
