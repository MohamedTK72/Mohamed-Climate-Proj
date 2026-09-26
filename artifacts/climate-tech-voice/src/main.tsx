import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// نقطة بداية الموقع: نعرض المكوّن الرئيسي داخل العنصر الموجود في HTML.
createRoot(document.getElementById('root')!).render(<App />);
