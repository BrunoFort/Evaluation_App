import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// NOC 2021 Version 1.0 - Major categories and common occupations
const nocOccupations = [
  // Management
  { code: "00010", title: "Legislators" },
  { code: "00011", title: "Senior government managers and officials" },
  { code: "00012", title: "Senior managers - financial, communications and other business services" },
  { code: "00013", title: "Senior managers - health, education, social and community services" },
  { code: "00014", title: "Senior managers - trade, broadcasting and other services" },
  { code: "00015", title: "Senior managers - construction, transportation, production and utilities" },
  { code: "10010", title: "Financial managers" },
  { code: "10011", title: "Human resources managers" },
  { code: "10012", title: "Purchasing managers" },
  { code: "10019", title: "Other administrative services managers" },
  { code: "10020", title: "Insurance, real estate and financial brokerage managers" },
  { code: "10021", title: "Banking, credit and other investment managers" },
  { code: "10022", title: "Advertising, marketing and public relations managers" },
  { code: "10029", title: "Other business services managers" },
  { code: "10030", title: "Telecommunication carriers managers" },
  { code: "20010", title: "Engineering managers" },
  { code: "20011", title: "Architecture and science managers" },
  { code: "20012", title: "Computer and information systems managers" },
  { code: "30010", title: "Health care managers" },
  { code: "40010", title: "Government managers - health and social policy development" },
  { code: "40011", title: "Government managers - economic analysis, policy development" },
  { code: "40012", title: "Government managers - education policy development and program administration" },
  { code: "40019", title: "Other managers in public administration" },
  { code: "40020", title: "Administrators - post-secondary education and vocational training" },
  { code: "40021", title: "School principals and administrators of elementary and secondary education" },
  { code: "40030", title: "Managers in social, community and correctional services" },
  { code: "50010", title: "Library, archive, museum and art gallery managers" },
  { code: "50011", title: "Managers - publishing, motion pictures, broadcasting and performing arts" },
  { code: "50012", title: "Recreation, sports and fitness program and service directors" },
  { code: "60010", title: "Corporate sales managers" },
  { code: "60020", title: "Retail and wholesale trade managers" },
  { code: "60030", title: "Restaurant and food service managers" },
  { code: "60031", title: "Accommodation service managers" },
  { code: "60040", title: "Managers in customer and personal services" },
  { code: "70010", title: "Construction managers" },
  { code: "70011", title: "Home building and renovation managers" },
  { code: "70012", title: "Facility operation and maintenance managers" },
  { code: "70020", title: "Managers in transportation" },
  { code: "80010", title: "Managers in natural resources production and fishing" },
  { code: "80020", title: "Managers in agriculture" },
  { code: "80021", title: "Managers in horticulture" },
  { code: "80022", title: "Managers in aquaculture" },
  { code: "90010", title: "Manufacturing managers" },
  { code: "90011", title: "Utilities managers" },
  
  // Business and Finance
  { code: "11100", title: "Financial auditors and accountants" },
  { code: "11101", title: "Financial and investment analysts" },
  { code: "11102", title: "Financial advisors" },
  { code: "11103", title: "Securities agents, investment dealers and brokers" },
  { code: "11109", title: "Other financial officers" },
  { code: "11200", title: "Human resources professionals" },
  { code: "11201", title: "Professional occupations in business management consulting" },
  { code: "11202", title: "Professional occupations in advertising, marketing and public relations" },
  
  // Natural and Applied Sciences
  { code: "21100", title: "Physicists and astronomers" },
  { code: "21101", title: "Chemists" },
  { code: "21102", title: "Geoscientists and oceanographers" },
  { code: "21103", title: "Meteorologists and climatologists" },
  { code: "21109", title: "Other professional occupations in physical sciences" },
  { code: "21110", title: "Biologists and related scientists" },
  { code: "21111", title: "Forestry professionals" },
  { code: "21112", title: "Agricultural representatives, consultants and specialists" },
  { code: "21200", title: "Architects" },
  { code: "21201", title: "Landscape architects" },
  { code: "21202", title: "Urban and land use planners" },
  { code: "21203", title: "Land surveyors" },
  { code: "21210", title: "Mathematicians, statisticians and actuaries" },
  { code: "21211", title: "Data scientists" },
  { code: "21220", title: "Cybersecurity specialists" },
  { code: "21221", title: "Business systems specialists" },
  { code: "21222", title: "Information systems specialists" },
  { code: "21223", title: "Database analysts and data administrators" },
  { code: "21230", title: "Computer systems developers and programmers" },
  { code: "21231", title: "Software engineers and designers" },
  { code: "21232", title: "Software developers and programmers" },
  { code: "21233", title: "Web designers" },
  { code: "21234", title: "Web developers and programmers" },
  { code: "21300", title: "Civil engineers" },
  { code: "21301", title: "Mechanical engineers" },
  { code: "21310", title: "Electrical and electronics engineers" },
  { code: "21311", title: "Computer engineers" },
  { code: "21320", title: "Chemical engineers" },
  { code: "21321", title: "Industrial and manufacturing engineers" },
  { code: "21322", title: "Metallurgical and materials engineers" },
  { code: "21330", title: "Mining engineers" },
  { code: "21331", title: "Geological engineers" },
  { code: "21332", title: "Petroleum engineers" },
  { code: "21333", title: "Aerospace engineers" },
  
  // Health
  { code: "31100", title: "Specialists in clinical and laboratory medicine" },
  { code: "31101", title: "Specialists in surgery" },
  { code: "31102", title: "General practitioners and family physicians" },
  { code: "31103", title: "Veterinarians" },
  { code: "31110", title: "Dentists" },
  { code: "31111", title: "Optometrists" },
  { code: "31112", title: "Audiologists and speech-language pathologists" },
  { code: "31120", title: "Pharmacists" },
  { code: "31121", title: "Dietitians and nutritionists" },
  { code: "31200", title: "Psychologists" },
  { code: "31201", title: "Chiropractors" },
  { code: "31202", title: "Physiotherapists" },
  { code: "31203", title: "Occupational therapists" },
  { code: "31204", title: "Kinesiologists and other professional occupations in therapy" },
  { code: "31209", title: "Other professional occupations in health diagnosing and treating" },
  { code: "31300", title: "Nursing coordinators and supervisors" },
  { code: "31301", title: "Registered nurses and registered psychiatric nurses" },
  { code: "31302", title: "Nurse practitioners" },
  { code: "31303", title: "Physician assistants, midwives and allied health professionals" },
  
  // Education, Law and Social
  { code: "41100", title: "Judges" },
  { code: "41101", title: "Lawyers and Quebec notaries" },
  { code: "41200", title: "University professors and lecturers" },
  { code: "41201", title: "Post-secondary teaching and research assistants" },
  { code: "41210", title: "College and other vocational instructors" },
  { code: "41220", title: "Secondary school teachers" },
  { code: "41221", title: "Elementary school and kindergarten teachers" },
  { code: "41300", title: "Educational counsellors" },
  { code: "41301", title: "Psychologists" },
  { code: "41302", title: "Social workers" },
  { code: "41303", title: "Marriage, family, child and other related counsellors" },
  { code: "41310", title: "Police officers" },
  { code: "41311", title: "Firefighters" },
  
  // Art, Culture, Recreation
  { code: "51100", title: "Librarians" },
  { code: "51101", title: "Archivists" },
  { code: "51102", title: "Conservators and curators" },
  { code: "51110", title: "Editors" },
  { code: "51111", title: "Authors and writers" },
  { code: "51112", title: "Technical writers" },
  { code: "51113", title: "Journalists" },
  { code: "51114", title: "Translators, terminologists and interpreters" },
  { code: "51120", title: "Producers, directors, choreographers and related occupations" },
  { code: "51121", title: "Conductors, composers and arrangers" },
  { code: "51122", title: "Musicians and singers" },
  
  // Sales and Service
  { code: "62010", title: "Retail sales supervisors" },
  { code: "62020", title: "Food service supervisors" },
  { code: "62021", title: "Executive housekeepers" },
  { code: "62022", title: "Accommodation, travel, tourism and related services supervisors" },
  { code: "62023", title: "Customer and information services supervisors" },
  { code: "62024", title: "Cleaning supervisors" },
  { code: "62029", title: "Other services supervisors" },
  { code: "62100", title: "Technical sales specialists - wholesale trade" },
  { code: "62101", title: "Retail and wholesale buyers" },
  { code: "63100", title: "Insurance agents and brokers" },
  { code: "63101", title: "Real estate agents and salespersons" },
  { code: "63102", title: "Financial sales representatives" },
  { code: "64100", title: "Retail salespersons and visual merchandisers" },
  
  // Trades and Transport
  { code: "72010", title: "Contractors and supervisors, machining, metal forming" },
  { code: "72011", title: "Contractors and supervisors, electrical trades" },
  { code: "72012", title: "Contractors and supervisors, pipefitting trades" },
  { code: "72013", title: "Contractors and supervisors, carpentry trades" },
  { code: "72014", title: "Contractors and supervisors, other construction trades" },
  { code: "72020", title: "Contractors and supervisors, mechanic trades" },
  { code: "72021", title: "Contractors and supervisors, heavy equipment operator crews" },
  { code: "72100", title: "Machinists and machining and tooling inspectors" },
  { code: "72101", title: "Tool and die makers" },
  { code: "72102", title: "Sheet metal workers" },
  { code: "72103", title: "Boilermakers" },
  { code: "72104", title: "Structural metal and platework fabricators and fitters" },
  { code: "72105", title: "Ironworkers" },
  { code: "72106", title: "Welders and related machine operators" },
  { code: "72200", title: "Electricians" },
  { code: "72201", title: "Industrial electricians" },
  { code: "72300", title: "Plumbers" },
  { code: "72301", title: "Steamfitters, pipefitters and sprinkler system installers" },
  { code: "72302", title: "Gas fitters" },
  { code: "72310", title: "Carpenters" },
  { code: "72311", title: "Cabinetmakers" },
  { code: "72320", title: "Bricklayers" },
  { code: "72400", title: "Construction millwrights and industrial mechanics" },
  { code: "72401", title: "Heavy-duty equipment mechanics" },
  { code: "72410", title: "Heating, refrigeration and air conditioning mechanics" },
  { code: "73100", title: "Concrete finishers" },
  { code: "73101", title: "Tilesetters" },
  { code: "73102", title: "Plasterers, drywall installers and finishers and lathers" },
  { code: "73110", title: "Roofers and shinglers" },
  { code: "73111", title: "Glaziers" },
  { code: "73200", title: "Residential and commercial installers and servicers" },
  
  // Natural Resources and Agriculture
  { code: "82010", title: "Supervisors, logging and forestry" },
  { code: "82011", title: "Supervisors, mining and quarrying" },
  { code: "82020", title: "Contractors and supervisors, oil and gas drilling and services" },
  { code: "82030", title: "Agricultural service contractors and farm supervisors" },
  { code: "82031", title: "Contractors and supervisors, landscaping, grounds maintenance" },
  { code: "83100", title: "Underground production and development miners" },
  { code: "83101", title: "Oil and gas well drillers, servicers, testers and related workers" },
  { code: "83110", title: "Logging machinery operators" },
  { code: "83111", title: "Logging and forestry labourers" },
  { code: "84100", title: "Fishing masters and officers" },
  { code: "84101", title: "Fishing vessel deckhands" },
  { code: "85100", title: "Livestock labourers" },
  { code: "85101", title: "Harvesting labourers" },
  { code: "85102", title: "Aquaculture and marine harvest labourers" },
  { code: "85103", title: "Nursery and greenhouse labourers" },
  { code: "85110", title: "Mine labourers" },
  { code: "85111", title: "Oil and gas drilling, servicing and related labourers" },
  { code: "85120", title: "Landscaping and grounds maintenance labourers" },
  
  // Manufacturing and Utilities
  { code: "92010", title: "Supervisors, mineral and metal processing" },
  { code: "92011", title: "Supervisors, petroleum, gas and chemical processing and utilities" },
  { code: "92012", title: "Supervisors, food and beverage processing" },
  { code: "92013", title: "Supervisors, plastic and rubber products manufacturing" },
  { code: "92014", title: "Supervisors, forest products processing" },
  { code: "92015", title: "Supervisors, textile, fabric, fur and leather products processing" },
  { code: "92020", title: "Supervisors, motor vehicle assembling" },
  { code: "92021", title: "Supervisors, electronics and electrical products manufacturing" },
  { code: "92022", title: "Supervisors, furniture and fixtures manufacturing" },
  { code: "92023", title: "Supervisors, other products manufacturing and assembly" },
  { code: "93100", title: "Central control and process operators, mineral and metal processing" },
  { code: "93101", title: "Central control and process operators, petroleum, gas and chemical" },
  { code: "93102", title: "Pulping, papermaking and coating control operators" },
  { code: "94100", title: "Machine operators, mineral and metal processing" },
  { code: "94101", title: "Foundry workers" },
  { code: "94102", title: "Glass forming and finishing machine operators and glass cutters" },
  { code: "94103", title: "Concrete, clay and stone forming operators" },
  { code: "94104", title: "Inspectors and testers, mineral and metal processing" },
  { code: "94105", title: "Metalworking and forging machine operators" },
  { code: "94106", title: "Machining tool operators" },
];

export default function NOCJobSelector({ value, onChange, customValue, onCustomChange, label = "Job Title" }) {
  const [useCustom, setUseCustom] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-slate-700 font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Custom entry</span>
          <Switch
            checked={useCustom}
            onCheckedChange={(checked) => {
              setUseCustom(checked);
              if (!checked) onCustomChange('');
            }}
          />
        </div>
      </div>
      
      {!useCustom ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full bg-white border-slate-200">
            <SelectValue placeholder="Select from NOC 2021 Version 1.0" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {nocOccupations.map((occ) => (
              <SelectItem key={occ.code} value={occ.code}>
                <span className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">{occ.code}</span>
                  <span>{occ.title}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Enter custom job title"
          className="bg-white border-slate-200"
        />
      )}
      
      <p className="text-xs text-slate-500">
        Based on NOC 2021 Version 1.0 - National Occupational Classification (Canada)
      </p>
    </div>
  );
}
