// Simulated code execution service
export class CodeExecutionService {
  static async executeCode(code: string, language: string): Promise<string> {
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      switch (language) {
        case 'javascript':
          return this.executeJavaScript(code);
        
        case 'python':
          return this.executePython(code);
        
        case 'html':
          return 'HTML code rendered in preview panel';
        
        default:
          return `Execution for ${language} is simulated.\nCode length: ${code.length} characters`;
      }
    } catch (error) {
      return `Execution Error: ${error}`;
    }
  }

  private static executeJavaScript(code: string): string {
    try {
      // This is a very basic simulation - in production you'd use a sandboxed environment
      const output: string[] = [];
      const originalLog = console.log;
      
      // Capture console.log output
      console.log = (...args: any[]) => {
        output.push(args.join(' '));
      };

      // Execute in a limited context
      const result = Function('"use strict"; return (' + code + ')')();
      
      console.log = originalLog;
      
      return output.length > 0 ? output.join('\n') : String(result);
    } catch (error) {
      return `JavaScript Error: ${error}`;
    }
  }

  private static executePython(code: string): string {
    // Python execution simulation
    const lines = code.split('\n');
    const output: string[] = [];
    
    for (const line of lines) {
      if (line.trim().startsWith('print(')) {
        const match = line.match(/print\(['"](.+)['"]\)/);
        if (match) {
          output.push(match[1]);
        }
      }
    }
    
    return output.length > 0 ? output.join('\n') : 'Python code executed successfully';
  }
}