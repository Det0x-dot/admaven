import Head from 'next/head';
import Form from '../components/Form';

export default function Home() {
  return (
    <div className="app-container min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-center text-2xl font-bold">AdMaven Sort Link Maker</h1>
      </header>
      <main className="flex-grow flex items-center justify-center py-8">
        <Form />
      </main>
      <footer className="p-4 bg-white dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2024 Admireus All rights reserved.
      </footer>
    </div>
  );
}
