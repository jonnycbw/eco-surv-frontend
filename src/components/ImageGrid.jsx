const ImageGrid = ({ images }) => {
    return (
        <div style={{ display: "flex", gap: "15px", flexDirection: "row", flexWrap: "wrap" }}>
            {images?.map((img) => {
                return (
                    <div style={{ backgroundImage: `url("${img}")`, backgroundSize: "cover", width: "120px", height: "120px", borderRadius: 15 }} />
                );
            })}
        </div>
    );
};

export default ImageGrid;
