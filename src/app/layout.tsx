import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import NProgressWrapper from "@/lib/nprogress.wrapper";
import { TrackContextProvider } from "@/lib/track.wrapper";
import { ToastProvider } from "@/utils/toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Soundcloud",
	description: "Vibe music",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				style={{
					minHeight: "150px",
					backgroundImage:
						'url("https://img.freepik.com/free-vector/modern-soft-colorful-watercolor-texture-elegant-background_1055-17362.jpg?t=st=1745764734~exp=1745768334~hmac=eb6cae79ab79180391914cd9a0ea6f5d986df707036530c9b3fdea32238c7b9e&w=826")',
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: "fixed",
					backgroundRepeat: "no-repeat",
					backgroundColor: "rgba(255, 255, 255, 0.5)",
					backgroundBlendMode: "darken",
				}}
			>
				<ThemeRegistry>
					<NProgressWrapper>
						<NextAuthWrapper>
							<ToastProvider>
								<TrackContextProvider>
									{children}
								</TrackContextProvider>
							</ToastProvider>
						</NextAuthWrapper>
					</NProgressWrapper>
				</ThemeRegistry>
			</body>
		</html>
	);
}
