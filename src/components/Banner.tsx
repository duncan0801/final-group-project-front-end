import "../styles/banner.css"

type BannerProps = {
	title: string;
	imageLink: string;
};

function Banner({ title, imageLink }: BannerProps) {
	return (
		<section className={"banner"}>
			<h1>{title}</h1>
			<img
				src={imageLink}
				alt={imageLink}
			></img>
		</section>
	);
}

export default Banner;
