export const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} intensity={2} />
            <directionalLight position={[0, 10, 0]} intensity={1} />
        </>
    )
}