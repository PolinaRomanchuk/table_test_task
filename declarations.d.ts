declare module '*.svg' {
  import type * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const source: string;
  export default source;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
