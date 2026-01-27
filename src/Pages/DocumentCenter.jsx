import React, { useState } from "react";
import CompanyLayout from "../layouts/CompanyLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import Button from "/src/components/ui/Button.jsx";
import { Input } from "../components/ui/input";
import { FileText, Download, Trash2, Folder } from "lucide-react";

export default function DocumentCenter() {
  // MOCK documents
  const [documents, setDocuments] = useState([
    { id: 1, name: "Employee Handbook.pdf", category: "HR", size: "1.2 MB" },
    { id: 2, name: "Code of Conduct.pdf", category: "Policies", size: "850 KB" },
    { id: 3, name: "Safety Guidelines.pdf", category: "Compliance", size: "2.1 MB" },
  ]);

  const [newDocName, setNewDocName] = useState("");
  const [newDocCategory, setNewDocCategory] = useState("");

  const addDocument = () => {
    if (!newDocName.trim() || !newDocCategory.trim()) return;

    setDocuments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newDocName,
        category: newDocCategory,
        size: "—",
      },
    ]);

    setNewDocName("");
    setNewDocCategory("");
  };

  const deleteDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <CompanyLayout>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Document Center
      </h1>

      {/* Upload mock */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur mb-10">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Add New Document
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <Input
            placeholder="Document name (e.g., CompanyPolicy.pdf)"
            value={newDocName}
            onChange={(e) => setNewDocName(e.target.value)}
            className="bg-white"
          />

          <Input
            placeholder="Category (e.g., HR, Policies, Compliance)"
            value={newDocCategory}
            onChange={(e) => setNewDocCategory(e.target.value)}
            className="bg-white"
          />

          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={addDocument}
          >
            Add Document
          </Button>
        </CardContent>
      </Card>

      {/* Document list */}
      <Card className="shadow-xl border-2 border-blue-100 bg-white/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <Folder className="text-blue-600" /> Documents
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" />
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    {doc.name}
                  </p>
                  <p className="text-slate-600 text-sm">
                    Category: {doc.category}
                  </p>
                  <p className="text-slate-400 text-sm">Size: {doc.size}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-slate-300 hover:bg-slate-100"
                >
                  <Download className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => deleteDocument(doc.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </CompanyLayout>
  );
}
