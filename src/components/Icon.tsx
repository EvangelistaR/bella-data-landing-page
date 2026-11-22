const paths: Record<string, string> = {
  calendar: "M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  bell: "M6 17h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v5L6 17zM10 20a2 2 0 0 0 4 0",
  sync: "M20 8a8 8 0 0 0-14-2M4 4v4h4M4 16a8 8 0 0 0 14 2M20 20v-4h-4",
  file: "M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5M9 13h6M9 17h6",
  chat: "M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2 20c0-3.3 3.1-5 7-5s7 1.7 7 5M17 4.5a3.5 3.5 0 0 1 0 6.5M19 15.3c1.8.8 3 2.1 3 4.2",
};

export default function Icon({ name }: { name: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
