    import React, { useState, useEffect } from 'react';
    import LogoutButton from '../components/logoutButton';
    import PostsCrusel from '../components/PostsCrusel';
    import CreatePost from '../components/CreatePost';
    import TableCrusel from '../components/TableCrusel';
    import { FaHome, FaTrophy, FaRss, FaBasketballBall } from 'react-icons/fa';
    import CreateJoinButton from '../components/CreateJointButton';
    import { gameData } from '../assets/gameData';
    import Game from '../components/Game';
      

    export default function Home() {
      const nbaGames = gameData.events;
      const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      return (
        <div className="bg-gray-100 min-h-screen">
          <main className="container mx-auto p-4 mt-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - 1/4 width */}
              {!isMobile && (
                <aside className="lg:w-1/4">
                  <CreateJoinButton />
                  <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FaTrophy className="mr-2 text-yellow-500" />
                      Leaderboard
                    </h2>
                    <TableCrusel slice={2} page='home'/>
                  </div>
                </aside>
              )}

              {/* Main Content - 2/4 width on desktop, full width on mobile */}
              <div className={isMobile ? "w-full" : "lg:w-2/4"}>
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaRss className="mr-2 text-blue-500" />
                    Create Post
                  </h2>
                  <CreatePost />
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaHome className="mr-2 text-green-500" />
                    Feed
                  </h2>
                  <PostsCrusel />
                </div>
              </div>

              {/* Right Sidebar - 1/4 width */}
              {!isMobile && (
                <aside className="lg:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <FaBasketballBall className="mr-2 text-orange-500" />
                      NBA Games
                    </h2>
                    <div className="space-y-4">
                      {nbaGames.slice(0, 3).map((game) => (
                        <Game key={game.event_id} game={game} />
                      ))}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </main>
        </div>
      );    
    }