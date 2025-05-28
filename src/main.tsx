import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material'
import theme from './theme/theme.ts'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>,
)

