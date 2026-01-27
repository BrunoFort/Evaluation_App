import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Button from "/src/components/ui/Button.jsx";
import { Input } from "../components/ui/input";
import { Sun, Moon, Palette } from "lucide-react";

export default function ThemeCustomizer() {
  const [theme, setTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [accentColor, setAccentColor] = useState("#facc15");

  const applyTheme = () => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--accent-color", accentColor);
    document.documentElement.classList.toggle("dark", theme === "dark");
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Theme Customizer
      </h1>

      {/* Theme Mode */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Palette className="text-blue-600" /> Theme Mode
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 flex gap-6">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setTheme("light")}
          >
            <Sun /> Light
          </Button>

          <Button
            variant={theme === "dark" ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setTheme("dark")}
          >
            <Moon /> Dark
          </Button>
        </CardContent>
      </Card>

      {/* Color Customization */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Colors
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Primary Color
            </label>
            <Input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-20 h-10 p-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Accent Color
            </label>
            <Input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-20 h-10 p-1"
            />
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
            onClick={applyTheme}
          >
            Apply Theme
          </Button>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Preview
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div
            className="p-6 rounded-lg shadow-md text-white"
            style={{
              backgroundColor: primaryColor,
            }}
          >
            <p className="text-lg font-semibold">Primary Color Example</p>
          </div>

          <div
            className="p-6 rounded-lg shadow-md mt-4"
            style={{
              backgroundColor: accentColor,
            }}
          >
            <p className="text-lg font-semibold text-slate-900">
              Accent Color Example
            </p>
          </div>
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}

