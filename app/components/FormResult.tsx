interface FormResultProps {
  result: { [key: string]: string | number | undefined };
}

export default function FormResult({ result }: FormResultProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Form Results:</h3>
      {Object.keys(result).map((item) => (
        <p key={item} className="text-gray-700">
          <strong>{item}:</strong> {result[item]}
        </p>
      ))}
    </div>
  );
}
