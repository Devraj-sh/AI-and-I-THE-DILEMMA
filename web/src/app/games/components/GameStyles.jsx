export default function GameStyles() {
  return (
    <style jsx global>{`
      @keyframes gradient-x {
        0%, 100% { background-size: 200% 200%; background-position: left center; }
        50% { background-size: 200% 200%; background-position: right center; }
      }
      .animate-gradient-x { animation: gradient-x 8s ease infinite; }
      
      .icon-3d {
        box-shadow: 
          0 8px 20px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }

      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-shimmer { animation: shimmer 2s infinite; }
      .animate-fade-in { animation: fade-in 0.5s ease-out; }
      
      .card-3d {
        transform-style: preserve-3d;
        box-shadow: 
          0 10px 30px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.1);
      }
      .card-3d:hover {
        box-shadow: 
          0 20px 60px rgba(0, 0, 0, 0.4),
          0 0 0 1px rgba(255, 255, 255, 0.2);
      }
      
      .button-3d {
        transform-style: preserve-3d;
        box-shadow: 
          0 8px 25px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
      .button-3d:hover {
        box-shadow: 
          0 15px 45px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
      }
      
      .nav-button-3d {
        transform-style: preserve-3d;
        box-shadow: 
          0 5px 15px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      .nav-button-3d:hover {
        box-shadow: 
          0 10px 30px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
    `}</style>
  );
}
