// Configuration for the Birthday Surprise Gift Website

export const siteConfig = {
  // GitHub Pages deployment settings
  // Change githubUsername to your GitHub username. The matching repository name is `${githubUsername}.github.io`
  githubUsername: "Talhasyed49",
  get permanentUrl() {
    return `https://${this.githubUsername.toLowerCase()}.github.io/`;
  },
  repoName: "Talhasyed49.github.io",

  // Recipient Details
  birthdayPerson: {
    name: "My Dearest",
    nickname: "Meri Jaan",
    greeting: "Assalamu Alaikum",
    title: "To The Light of My Life & My Greatest Dua 💖",
    hadithQuote:
      "Jis tarah Hazrat Ali (RA) aur Sayyida Fatima Zahra (RA) ka rishta mohabbat, izzat, sabr aur wafadari ki ek khoobsurat misaal hai, meri bhi khwahish hai ki main tumse hamesha sachchai, izzat aur wafadari ke saath mohabbat karun.",
    birthdayWish:
      "Happy Birthday! May Allah bless your life with happiness, peace, good health and endless blessings. Ameen.",
  },

  // Photographs
  photos: [
    {
      id: "p1",
      src: "./photos/photo1.jpg",
      uprightSrc: "./photos/photo1.jpg",
      caption: "Tumhari sadagi aur wo pyari si muskaan... ✨",
      subCaption: "A picture that brings peace to my heart every single time.",
      tag: "Pure Grace 🌸",
      rotation: -2,
    },
    {
      id: "p2",
      src: "./photos/photo2_upright.jpg",
      originalSrc: "./photos/photo2.jpg",
      caption: "Har lamha jo tumhare sath ho, wo sabse khaas hai 💖",
      subCaption: "Your eyes reflect kindness, warmth, and innocence.",
      tag: "Precious Moments 🎀",
      rotation: 2.5,
    },
    {
      id: "p3",
      src: "./photos/photo3.jpg",
      uprightSrc: "./photos/photo3.jpg",
      caption: "Meri duaon ka sabse khoobsurat jawab ho tum 🦋",
      subCaption: "Cute, gentle, and forever radiating gentle warmth.",
      tag: "My Sweet Butterfly 🌷",
      rotation: -1.5,
    },
    {
      id: "p4",
      src: "./photos/photo4_upright.jpg",
      originalSrc: "./photos/photo4.jpg",
      caption: "Allah tumhari muskurahat ko hamesha salamat rakhe 🌷",
      subCaption: "May your journey be filled with endless barakah and joy.",
      tag: "Endless Noor ✨",
      rotation: 2,
    },
  ],

  // Islamic Duas & Heartfelt Wishes
  islamicWishes: [
    {
      icon: "🌙",
      title: "Khushiyan & Barkat (Happiness & Barakah)",
      dua: "Ya Allah, meri pyari ki zindagi me hamesha aisi khushiyan bhar de jisme teri raza shamil ho. Uski har subah muskurahat ke saath shuru ho aur har shaam shukr aur sukoon ke sath guzre.",
    },
    {
      icon: "✨",
      title: "Sehat aur Tandurusti (Good Health & Vitality)",
      dua: "Allah Ta'ala tumhe hamesha behtareen sehat, tandurusti aur lamba ba-barkat jeevan ata farmaye. Kisi bhi bimari, takleef ya pareshani ka saya bhi tumpar na pade.",
    },
    {
      icon: "⭐️",
      title: "Kamiyabi & Taraqqi (Success & Elevation)",
      dua: "Tum jo bhi neik irada karo, Allah usme aasanian paida kare. Tumhari mehnat rang laye aur tumhe deen aur dunya dono me aala muqaam aur kamiyabi naseeb ho.",
    },
    {
      icon: "🕊️",
      title: "Sukoon-e-Qalb (Peace of Heart & Mind)",
      dua: "Dunya chahe kitni bhi shor-sharabe wali ho, tumhare dil me hamesha ek paak sukoon qayam rahe. Jab bhi koi gham sataye, Allah ka zikr tumhare dil ko sukoon de.",
    },
    {
      icon: "🛡️",
      title: "Allah Ki Hifazat (Divine Protection)",
      dua: "Allah tumhe har buri nazar, hasad aur nafs ki buraiyon se apni hifazat-e-khaas me mehfooz rakhe. Farishte hamesha tumhari hifazat ke liye mamoor rahen.",
    },
    {
      icon: "🤲",
      title: "Sabr, Shukr & Haseen Mustaqbil (Patience & Beautiful Future)",
      dua: "Tumhare dil me hamesha shukr aur sabr ki roshni chamakti rahe. Aur InshaAllah, aane wala kal tumhare liye bepanah rehmaton aur khoobsurat yaadon se saja ho.",
    },
  ],

  // Love Letter
  letter: {
    greeting: "Meri Pyaari Jaan, Meri Zindagi, Meri Sabse Khaas Dua ❤️",
    date: "Today & Always",
    paragraphs: [
      "Sabse pehle tumhe janamdin ki be-inteha mubarakbaad! Aaj ka din mere liye saal ka sabse ahem aur barkat wala din hai, kyunki aaj ke din Allah Ta'ala ne is dunya me tumhe bheja — ek aisi pyari rooh ko jo aage chalkar meri zindagi ka sabse khoobsurat noor aur sukoon banne wali thi.",

      "Tumhari masoomiyat, tumhari izzat, tumhari sharm-o-haya aur tumhara saaf dil meri zindagi ki sabse badi daulat hai. Jab bhi tum hasti ho, mera dil khushi se bhar jata hai, aur jab bhi main tumhe dekhta hoon, mujhe ehsaas hota hai ki Allah ne meri be-awaz duaon ka sabse haseen jawab mujhe tumhari soorat me diya hai.",

      "Hazrat Ali (RA) aur Sayyida Fatima Zahra (RA) ka rishta is kaainaat me mohabbat, izzat, sabr aur wafadari ki sabse pakeeza misaal hai. Hazrat Ali (RA) farmate the: 'Khuda ki qasam! Maine apni zindagi me kabhi Fatima ko naraaz nahi kiya, aur na hi kabhi unhone mujhe ranj pohchaya... Jab bhi main Fatima ke chehre ko dekhta tha, mere dunya ke saare gham, thakan aur dukh lamhon me mit jate the.'",

      "Meri bhi rab se yahi dua hai aur mera tumse yahi pakka wada hai ki main tumhare sath hamesha Hazrat Ali (RA) aur Sayyida Fatima (RA) jaisi sachchi, be-laus aur pakeeza mohabbat nibhaun. Tumhe hamesha waisi hi izzat aur shafqat doon jiski tum haqdaar ho. Main chahta hoon ki hamara rishta aisi barkaton se bhara ho jo sirf is dunya tak mehdood na rahe, balke Jannat tak hamara sath banaye.",

      "Is janamdin par meri rab se dua hai ki wo tumhari zindagi ko har gham aur pareshani se azaad rakhe. Tumhari har subah khushiyon se roshan ho aur har shaam sukoon-e-qalb ke sath guzre. Allah tumhe hamesha aala sehat, lamba ba-barkat jeevan, deen aur dunya dono me azeem kamiyabi aur apni hifazat-e-khaas me mehfooz rakhe.",

      "Mera wada hai ki main hamesha tumhare sath har mod par sachhai, izzat, sabr aur wafadari ke sath khada rahunga. Khushi me tumhari muskaan banunga aur mushkil me tumhari dhaal. Tum meri zindagi ki sabse pyari haqeeqat ho.",

      "Happy Birthday once again meri jaan! May Allah bless every single second of your life with infinite joy, peace, and endless love. Ameen! 🤲✨"
    ],
    closing: "Hamesha sirf tumhara,",
    signature: "With All My Heart, Soul & Duas 💍❤️",
  },

  // Proposal Section
  proposal: {
    heading: "Will You Marry Me?",
    subHeading: "A question that comes straight from the bottom of my heart...",
    quote: "Tumhare sath zindagi ka har lamha ek ibadat aur ek khoobsurat safar ban jaye...",
    yesResponse: {
      title: "YAY! You Made This Moment Special! 🎉💍❤️",
      subtitle: "Alhamdulillah! You said YES to a lifetime of love and companionship!",
      message:
        "InshaAllah, hamara safar hamesha mohabbat, izzat, wafadari aur barkat se bhara rahega. Tum meri dunya bhi ho aur meri aakhirat ki dua bhi. I promise to cherish, respect, and love you forever!",
      dua: "May Allah bless our bond with endless love, harmony, and barakah. Ameen! 🤲✨",
    },
    playfulNoMessages: [
      "Are you sure? 🥺",
      "Ek baar aur soch lo na! 🙈",
      "Main daily chocolates aur roses launga! 🍫🌹",
      "Aise na karo meri jaan... 🥺",
      "Chalo thoda time le lo, par Haan keh do! 💍",
      "Mujhe pata hai tumhara dil YES bol raha hai! 💖",
      "NO button ko bhi sharam aa rahi hai! 😂❤️",
      "Pakka na? Ek aur chance? 🥺👉👈",
    ],
  },

  // Music
  music: {
    title: "Romantic Ambient Melody",
    subtitle: "Gentle Piano & Soft Strings 🎵",
    src: "./audio/romantic-melody.wav",
  },
};

