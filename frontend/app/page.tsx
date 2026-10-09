import RequirementWizard from "@/components/RequirementWizard";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">EventReq</h1>
        <p className="mt-1 text-slate-500">
          Post your event requirement in four quick steps.
        </p>
      </header>
      <RequirementWizard />
    </main>
  );
}
