// Editor.jsx
import React, { useState } from 'react';
import { Select } from 'antd';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { autocompletion } from '@codemirror/autocomplete';

const { Option } = Select;

const languageExtensions = {
  javascript: javascript,
  python: python,
  cpp: cpp,
  java: java,
};

function Editor() {
  const [code, setCode] = useState('// Start coding here!');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(getStartingSnippet(language)); // Optional: Reset editor with a snippet
  };

  const getStartingSnippet = (language) => {
    switch (language) {
      case 'javascript':
        return `// JavaScript Snippet\nfunction example() {\n  console.log("Hello World");\n}`;
      case 'python':
        return `# Python Snippet\ndef example():\n  print("Hello World")`;
      case 'cpp':
        return `// C++ Snippet\n#include <iostream>\nint main() {\n  std::cout << "Hello World" << std::endl;\n  return 0;\n}`;
      case 'java':
        return `// Java Snippet\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`;
      default:
        return '// Start coding here!';
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <div style={{ marginBottom: '10px' }}>
        <Select
          defaultValue={selectedLanguage}
          style={{ width: 200 }}
          onChange={handleLanguageChange}
        >
          <Option value="javascript">JavaScript</Option>
          <Option value="python">Python</Option>
          <Option value="cpp">C++</Option>
          <Option value="java">Java</Option>
        </Select>
      </div>

      <CodeMirror
        value={code}
        height="100%"
        theme={dracula}
        extensions={[
          languageExtensions[selectedLanguage](),
          autocompletion({ icons: false }), // Add basic autocompletion
        ]}
        onChange={handleCodeChange}
      />
    </div>
  );
}

export default Editor;
