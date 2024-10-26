    import axios from 'axios';
    import * as cheerio from 'cheerio';
    import pkg from 'user-agents';
    const { random: randomUserAgent } = pkg;
    
    export async function getGameReview(team1, team2, date) {
        // Construct the search query using the team names
        const query = `${team1} vs ${team2} ${date} preview espn`;
        console.log("query: ", query);

        // Set the Google search URL
        const searchUrl = 'https://www.google.com/search?q=';
        // Use a random user agent to avoid detection as a bot
        const headers = { 'User-Agent': randomUserAgent().toString() };
    
        // Set up the search parameters
        const params = { q: query };
        try {
            // Make a GET request to Google search
            const response = await axios.get(searchUrl, { headers, params });
            if (response.status !== 200) {
                console.log('Failed to retrieve search results');
                return null;
            }
    
            // Parse the HTML content of the search results
            const $ = cheerio.load(response.data);
            const links = $('a');
    
            // Find the ESPN preview link
            for (let i = 0; i < links.length; i++) {
                const href = $(links[i]).attr('href');
                // console.log("href: ", href);
                
                if (href && href.startsWith('https://www.espn')) {
                    console.log("href: ", href);
                    // Extract the actual URL from the Google redirect
                    // const url = new URL(href, 'https://www.google.com').searchParams.get('q');
                    // console.log("url: ", url);
                    
                    // if (url && url.startsWith('https://www.espn.com')) {
                        try {
                            // Make a GET request to the extracted URL
                            const previewResponse = await axios.get(href, { headers: { 'User-Agent': randomUserAgent().toString() } });
                            if (previewResponse.status === 200) {
                                // Parse the HTML content of the preview page
                                const previewHtml = previewResponse.data;
                                // console.log("previewHtml: ", previewHtml);
                                const previewSoup = cheerio.load(previewHtml);
                                // console.log("previewSoup: ", previewSoup);
                                // Extract all text content from the preview page
                                const previewText = previewSoup.text();

                                // Extract the text from the div with class "Story__Body t__body"
                                const storyBody = previewSoup('#fittPageContainer > div.pageContent > div > div > div:nth-child(6) > div > div > section.Card.pv6 > div > div.Story__Body.t__body');
                                if (storyBody.length > 0) {
                                    // console.log("storyBody: ", storyBody);
                                    const previewText = storyBody.text().trim();
                                    return previewText;
                                } else {
                                    console.log('Story body not found');
                                    return null;
                                }
                                // console.log("previewText: ", previewText);
                                return previewText;
                            }
                        } catch (error) {
                            console.error('Error fetching ESPN preview:', error);
                        }
                        
                        // Break after processing the ESPN preview link
                        break;
                    // }
                }
            }
    
            // If no preview is found
            console.log('No ESPN preview found');
            return null;
        } catch (error) {
            // Log any errors that occur during the process
            console.error('Error fetching game preview:', error);
            return null;
        }
    }
