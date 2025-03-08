import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        ✅ TailwindCSS & ShadCN Setup is Working!
      </h1>
      
      <Button variant="default" className="mb-4">
        ShadCN Button
      </Button>

      <Card className="w-80 shadow-lg">
        <CardHeader>
          <CardTitle>ShadCN Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">This is a ShadCN Card component.</p>
        </CardContent>
      </Card>

      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">ShadCN Input:</label>
        <Input 
          type="text" 
          placeholder="Type something..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="w-64"
        />
      </div>
    </div>
  );
}

export default App;
