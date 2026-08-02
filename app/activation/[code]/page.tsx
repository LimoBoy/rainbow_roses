
interface PageProps {
    params: {
        code: string
    }
}

export default async function ActivationPage({ params }: PageProps) {
    const { code } = await params;
    return (
        <h1>Code {code}</h1>
    );
}