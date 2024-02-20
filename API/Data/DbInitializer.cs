
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {

            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "Kramer",
                    Email = "Kramer@gmail.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "Admin@gmail.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
            }

            if (context.Products.Any()) return;

            var products = new List<Product> 
            {
                new Product
                {
                    Name = "The Legend of Zelda: Tears of the Kingdom",
                    Description =
                        "An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda: Tears of the Kingdom for Nintendo Switch. The adventure is yours to create in a world fueled by your imagination. In this sequel to The Legend of Zelda: Breath of the Wild, you’ll decide your own path through the sprawling landscapes of Hyrule and the mysterious islands floating in the vast skies above. Can you harness the power of Link’s new abilities to fight back against the malevolent forces that threaten the kingdom?",
                    Price = 6999,
                    PictureUrl = "/images/products/Zelda-TOTK.png",
                    Brand = "Nintendo",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Animal Crossing: New Horizons",
                    Description = "Escape to a deserted island and create your own paradise as you explore, create, and customize in the Animal Crossing: New Horizons game. Your island getaway has a wealth of natural resources that can be used to craft everything from tools to creature comforts. You can hunt down insects at the crack of dawn, decorate your paradise throughout the day, or enjoy sunset on the beach while fishing in the ocean. The time of day and season match real life, so each day on your island is a chance to check in and find new surprises all year round. Get ready to make a splash in your own island paradise. A series of free updates* to the Animal Crossing: New Horizons game for the Nintendo Switch system will deliver new features, including the ability to swim and dive for sea creatures. You'll also get to interact with fresh faces and discover a variety of new items, including mermaid-themed furniture. These free updates are among some of the new experiences coming to your island life over the course of the summer and beyond.",
                    Price = 5999,
                    PictureUrl = "/images/products/Animal-Crossing.png",
                    Brand = "Nintendo",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Diablo IV",
                    Description =
                        "Diablo® IV is the next-gen action RPG experience with endless evil to slaughter, countless abilities to master, nightmarish Dungeons, and legendary loot. Embark on the campaign solo or with friends, meeting memorable characters through beautifully dark settings and a gripping story, or explore an expansive end game and shared world where players can meet in towns to trade, team up to battle World Bosses, or descend into PVP zones to test their skills against other players - no lobbies necessary - with cross-play and cross-progression on all available platforms. This is only the beginning for Diablo® IV, with new events, stories, seasons, rewards, and more looming on the horizon.",
                    Price = 3999,
                    PictureUrl = "/images/products/Diablo-IV.png",
                    Brand = "Blizzard",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sea of Thieves",
                    Description =
                        "Sea of Thieves is your gateway to the pirate life you’ve always dreamed of, serving up endless opportunities for adventure, excitement, and discovery in a vast world where the seas are home to crews of other players (requires Xbox Live Gold or Xbox Game Pass Ultimate on console, membership sold separately). Everything you need to set sail is already at your fingertips, so you’re free to chart your own path across the waves. Enjoy thrilling stories, dangerous sea creatures, and hauls of hidden treasure that help shape your own unique pirate legend. Sea of Thieves is a multiplayer game that delivers all you need to live the free-roaming pirate life. Whether adventuring as a group or sailing solo, you'll encounter other crews... but will they be friends or foes, and how will you respond?",
                    Price = 1499,
                    PictureUrl = "/images/products/Sea-Of-Thieves.png",
                    Brand = "Microsoft",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Call of Duty: Black Ops 4",
                    Description =
                        "Call of Duty Black Ops is back on PS4! Featuring gritty, grounded Multiplayer combat, the biggest Zombies offering ever with three full undead adventures at launch, and Blackout, where the universe of Black Ops comes to life in a massive battle royale experience. Blackout features the largest map in Call of Duty history, signature Black Ops combat, and characters, locations and weapons from the Black Ops series.",
                    Price = 1499,
                    PictureUrl = "/images/products/COD-BO.png",
                    Brand = "Activision",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Super Mario Bros. Wonder",
                    Description =
                        "Introducing the ultimate gaming adventure that will transport you to a world of pure joy and excitement! Get ready to embark on an epic journey with Super Mario Bros Wonder for Nintendo Switch. This platformer masterpiece from Nintendo will captivate your senses with its stunning graphics, immersive gameplay, and nostalgic charm. Join Mario and his pals as they navigate through treacherous levels, defeat menacing enemies, and collect power-ups to save Princess Peach. With its innovative features and endless fun, Super Mario Bros Wonder is a must-have for every gaming enthusiast. Get ready to jump, stomp, and slide your way to victory!",
                    Price = 5999,
                    PictureUrl = "/images/products/Mario-Wonder.png",
                    Brand = "Nintendo",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Skull And Bones",
                    Description =
                        "Enter the perilous world of Skull and Bones, a co-op pirate open world action-RPG experience, to become the most infamous pirate kingpin! Be part of an immersive world that introduces new challenges and features every season.",
                    Price = 6999,
                    PictureUrl = "/images/products/Skull-And-Bones.png",
                    Brand = "Ubisoft",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Call of Duty: Modern Warfare III",
                    Description =
                        "Call of Duty Modern Warfare 3 is here. The best-selling first person shooter video game franchise of all-time releases with its latest installment on November 10, 2023. Jump back into a thrilling, adrenaline-fueled experience, packed with explosive action, memorable characters, and a gripping narrative. It's a must-play for fans of the COD franchise and FPS enthusiasts alike.",
                    Price = 6999,
                    PictureUrl = "/images/products/COD-MW3.png",
                    Brand = "Activision",
                    Type = "Games",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Microsoft Xbox Series X Console",
                    Description =
                        "Get the Xbox Series X, the ultimate gaming console that offers unparalleled speed and power. With the ability to play thousands of titles from previous generations, this console ensures that every game looks and plays its best. Thanks to the innovative Xbox Velocity Architecture, you can experience faster and smoother gameplay with reduced load times, thanks to the custom SSD and integrated software. Switching between multiple games is a breeze with Quick Resume, allowing you to seamlessly jump into different gaming experiences. Immerse yourself in stunning 4K gaming at up to 120 frames per second, enhanced by advanced 3D spatial sound for a truly immersive gaming experience.",
                    Price = 42999,
                    PictureUrl = "/images/products/Xbox.png",
                    Brand = "Microsoft",
                    Type = "Consoles",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "AVGPC Hellfire Series Gaming PC",
                    Description =
                        "AMD Ryzen 7 7800X3D 8-Core, RTX 4070 12GB, 32GB 5600MHz DDR5, 1TB NVME M.2 SSD, 240mm AIO Liquid Cooler, ARGB Fans, Wifi/AC, Cooler Master 520 style Case, and Windows 11.",
                    Price = 199999,
                    PictureUrl = "/images/products/Gaming-PC.png",
                    Brand = "AVGPC",
                    Type = "Consoles",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "PlayStation 5",
                    Description =
                        "Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio,3 and an all-new generation of incredible PlayStation® games. Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation® console can do.",
                    Price = 44999,
                    PictureUrl = "/images/products/PlayStation-5.png",
                    Brand = "Sony",
                    Type = "Consoles",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Wireless Xbox Controller",
                    Description =
                        "Play like a pro with the world's most advanced Xbox controller. Designed to meet the needs of today's competitive gamers, the all-new Xbox Elite Wireless Controller Series 2 features over 30 new ways to play like a pro. Enhance your aiming with new adjustable-tension thumbsticks, fire even faster with shorter hair trigger locks, and stay on target with a wrap-around rubberized grip.",
                    Price = 17999,
                    PictureUrl = "/images/products/Xbox-Controller.png",
                    Brand = "Microsoft",
                    Type = "Accessories",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sony Wireless Controller for PlayStation 5",
                    Description =
                        "Experience the power of gaming at your fingertips. The Sony DualSense Wireless Controller enhances your gaming experience. With revolutionary features and comfort with intuitive, precision controls you can fully experience your favorite video games. This wireless controller offers immersive haptic feedback, dynamic adaptive triggers and a built-in microphone, all integrated into an iconic comfortable design. Take gaming to the next level with this wireless PS5 controller.",
                    Price = 5499,
                    PictureUrl = "/images/products/PS-Controller.png",
                    Brand = "Sony",
                    Type = "Accessories",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Logitech G502 Wireless Gaming Mouse",
                    Description =
                        "G502 Wireless is an icon, topping the charts through every generation, and the mouse of choice for serious gamers. Now, G502 joins the ranks of the world's most advanced wireless gaming mice with the release of G502 LIGHTSPEED. LIGHTSPEED is ultra-fast and reliable with performance trusted in competition by esports pros. G502 LIGHTSPEED also features the next-generation HERO 16K sensor and is POWERPLAY compatible. With this complete advanced technology remastering, G502 LIGHTSPEED still retains the same beloved shape—and achieves a 7-gram weight reduction.",
                    Price = 13999,
                    PictureUrl = "/images/products/L-Mouse.png",
                    Brand = "Logitech",
                    Type = "Accessories",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Razer Huntsman Clicky Gaming Keyboard",
                    Description =
                        "If all-out advantage is more your speed, arm yourself with responsiveness that’s second to none. Meet the Razer Huntsman V2—an optical gaming keyboard with near-zero input latency and fully geared out with other high-end features to make it the complete package.",
                    Price = 18999,
                    PictureUrl = "/images/products/R-Keyboard.png",
                    Brand = "Razer",
                    Type = "Accessories",
                    QuantityInStock = 100
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}