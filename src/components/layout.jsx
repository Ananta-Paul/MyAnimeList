import Navbar from "./navbar";
import Footer from "./footer";
import VideoPlay from "./miniComponents/videoplay";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <VideoPlay />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
