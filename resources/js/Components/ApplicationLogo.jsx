export default function ApplicationLogo({ hasShadow = false }) {
    const imageName = 'logo.png';

    return (
        <img
            src={`/images/${imageName}`}
            alt="Dynamic Example"
            className={`h-full w-full object-contain ${hasShadow ? 'drop-shadow' : ''}`}
        />
    );
}
