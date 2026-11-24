export type Language = "id" | "en";

export interface HotspotSpec {
  id: string;
  number: number;
  x: number; // percentage from left
  y: number; // percentage from top
  partId: string;
  partEn: string;
  gsxAdaptationId: string;
  gsxAdaptationEn: string;
  fabricationSpec: string;
}

export interface RedesignConcept {
  id: string;
  code: string;
  yearEra: string;
  nameId: string;
  nameEn: string;
  taglineId: string;
  taglineEn: string;
  inspiration: string;
  terrainFocusId: string;
  terrainFocusEn: string;
  image: string;
  palette: { hex: string; label: string }[];
  specs: {
    wheelFront: string;
    wheelRear: string;
    seatHeightMm: number;
    groundClearanceMm: number;
    rakeDeg: string;
    sprocket: string;
    weightEstimateKg: number;
    budgetRangeIdr: string;
  };
  deltasFromReferenceId: string[];
  deltasFromReferenceEn: string[];
  hotspots: HotspotSpec[];
}

export const BASELINE_REFERENCE = {
  image: "/assets/aistudio/image_52e865d8.png",
  nameId: "Referensi Awal (Urban Scrambler)",
  nameEn: "Initial Reference (Urban Scrambler)",
  summaryId:
    "Foto acuan awal dengan tangki krem-hitam, jok kulit cokelat ribbed, lampu grille bulat, serta mesin DOHC 150cc dan rangka tubular Suzuki.",
  summaryEn:
    "Initial reference photo with cream-black tank, brown ribbed leather bench, caged round headlight, and Suzuki 150cc DOHC engine/frame.",
};

export const REDESIGN_CONCEPTS: RedesignConcept[] = [
  {
    id: "rm-enduro",
    code: "01",
    yearEra: "1978",
    nameId: "1978 RM-150 Heritage Enduro",
    nameEn: "1978 RM-150 Heritage Enduro",
    taglineId: "Proporsi balap garuk tanah era keemasan Suzuki Champion Yellow.",
    taglineEn: "Golden-era motocross proportions in Suzuki Champion Yellow.",
    inspiration: "Suzuki RM125C / PE175 (1978)",
    terrainFocusId: "Enduro Hutan & Jalur Tanah",
    terrainFocusEn: "Forest Enduro & Dirt Singletrack",
    image: "/src/assets/images/redesign_rm_enduro_1795499978471.jpg",
    palette: [
      { hex: "#EAB308", label: "Champion Yellow" },
      { hex: "#141413", label: "Frame Matte Black" },
      { hex: "#B48B3E", label: "Anodized Gold Rim" },
      { hex: "#F4F4F0", label: "Number Plate White" },
    ],
    specs: {
      wheelFront: "21 × 1.60 (80/100-21 Knobby)",
      wheelRear: "18 × 2.15 (110/100-18 Knobby)",
      seatHeightMm: 865,
      groundClearanceMm: 275,
      rakeDeg: "27.5°",
      sprocket: "14T / 50T (Rantai 428H)",
      weightEstimateKg: 121,
      budgetRangeIdr: "Rp 20 – 26 Juta",
    },
    deltasFromReferenceId: [
      "Tangki scrambler krem diganti tangki motocross ramping Champion Yellow dengan striping biru-hitam klasik dan baseplate fuel pump EFI GSX-S150.",
      "Jok rata cokelat diubah menjadi jok solo enduro yang lebih tinggi & sempit agar mobilitas berdiri di jalur off-road lebih leluasa.",
      "Velg jari-jari hitam diganti pelek aluminium anodized emas 21 inci depan / 18 inci belakang dengan pelat nomor oval #15 di samping & batok lampu kuning.",
      "Knalpot hitam diganti silencer stainless brushed dengan pelindung panas berlubang bergaya expansion-pipe era 70-an.",
    ],
    deltasFromReferenceEn: [
      "Replaces the cream scrambler tank with a slim Champion Yellow motocross tank featuring retro black/blue stripes and recessed GSX-S150 EFI pump mount.",
      "Swaps the flat brown bench for a narrower, taller solo enduro saddle optimized for standing attack position.",
      "Upgrades wheels to gold-anodized 21\" front / 18\" rear spoked rims with classic #15 oval number plates and yellow-lens rally lamp.",
      "Replaces the black muffler with a brushed stainless upswept dirt exhaust and perforated heat shield.",
    ],
    hotspots: [
      {
        id: "rm-tank",
        number: 1,
        x: 52,
        y: 31,
        partId: "Tangki RM Teardrop + Mount EFI",
        partEn: "RM Teardrop Tank + EFI Pump Mount",
        gsxAdaptationId:
          "Plat dasar tangki bawaan GSX-S150 dicangkokkan ke bawah tangki pelat 1.2mm agar modul fuel pump injeksi terpasang plug-and-play tanpa bocor.",
        gsxAdaptationEn:
          "Stock GSX-S150 bottom pump flange is TIG-welded into the 1.2mm steel teardrop tank so the OEM EFI fuel pump fits plug-and-play.",
        fabricationSpec: "Kapasitas 8.5L · Pelat galvanis 1.2mm · Cat polyurethane Champion Yellow",
      },
      {
        id: "rm-cockpit",
        number: 2,
        x: 69,
        y: 26,
        partId: "Lampu Kuning & Number Plate #15",
        partEn: "Yellow Lamp & Front Plate #15",
        gsxAdaptationId:
          "Bracket komstir custom menopang lampu bulat 5.5 inci + plat nomor oval; spidometer digital GSX-S150 dipindah ke braket riser setang fatbar.",
        gsxAdaptationEn:
          "Custom steering-stem bracket carries a 5.5\" yellow-lens lamp and oval number plate; stock GSX digital cluster relocates onto the crossbar.",
        fabricationSpec: "Setang crossbar 22mm · Riser +35mm · Spatbor tinggi ABS/PP fleksibel",
      },
      {
        id: "rm-engine",
        number: 3,
        x: 50,
        y: 59,
        partId: "Mesin DOHC 147.3cc & Skid Plate",
        partEn: "147.3cc DOHC Engine & Bash Plate",
        gsxAdaptationId:
          "Radiator tetap di posisi depan dengan tambahan kisi pelindung aluminium; leher knalpot dibelokkan ke atas sisi kanan untuk ground clearance 275mm.",
        gsxAdaptationEn:
          "OEM radiator stays forward with an aluminum stone mesh; exhaust header routes tight up the right frame rail for 275mm clearance.",
        fabricationSpec: "Skid plate duralumin 4mm · Leher pipa stainless 32mm",
      },
      {
        id: "rm-subframe",
        number: 4,
        x: 28,
        y: 38,
        partId: "Subframe Enduro & Oval Side Plate",
        partEn: "Enduro Subframe & Side Number Plates",
        gsxAdaptationId:
          "Subframe belakang bawaan GSX dipotong dari sambungan tengah dan dibangun ulang memakai pipa seamless 22.2mm dengan loop belakang melengkung ke atas.",
        gsxAdaptationEn:
          "Rear subframe is cut behind the main pivot and rebuilt from 22.2mm seamless tubing with an upswept loop and side number plate tabs.",
        fabricationSpec: "Pipa seamless 22.2mm tebal 2mm · Jok busa rebonded high-density",
      },
      {
        id: "rm-exhaust",
        number: 5,
        x: 24,
        y: 45,
        partId: "Knalpot High-Mount Brushed",
        partEn: "High-Mount Brushed Dirt Pipe",
        gsxAdaptationId:
          "Dudukan silencer menyatu dengan rangka belakang kanan sehingga aman saat melibas sungai dangkal dan batu.",
        gsxAdaptationEn:
          "Silencer hanger mounts cleanly to the right subframe rail, keeping the pipe high out of water crossings and rock hits.",
        fabricationSpec: "Silencer stainless 304 · Heat shield laser-cut berlubang",
      },
      {
        id: "rm-wheels",
        number: 6,
        x: 80,
        y: 66,
        partId: "Konversi Kaki-kaki 21\" / 18\" Gold",
        partEn: "21\" / 18\" Gold Spoke Wheel Conversion",
        gsxAdaptationId:
          "Tromol KLX150/CRF150 dibubut boshing as roda 12mm depan & 15mm belakang agar presisi ke garpu & swingarm custom GSX-S150.",
        gsxAdaptationEn:
          "KLX/CRF hubs machined with custom spacers for GSX axle diameters, paired with extended fork tubes (+70mm) and heavy-duty monoshock link.",
        fabricationSpec: "Pelek aluminium 36H · Ban trail 80/100-21 & 110/100-18",
      },
    ],
  },
  {
    id: "baja-desert",
    code: "02",
    yearEra: "1974",
    nameId: "1974 Baja TS-150 Desert Sled",
    nameEn: "1974 Baja TS-150 Desert Sled",
    taglineId: "Karakter tangguh gurun berbalut baja brushed, zaitun, dan suede.",
    taglineEn: "Rugged desert-sled stance in brushed steel, olive drab, and suede.",
    inspiration: "Suzuki TS185 Sierra / TM400 Baja (1974)",
    terrainFocusId: "Gravel Cepat, Pasir & Lintas Alam",
    terrainFocusEn: "Fast Gravel, Sand & Fire Roads",
    image: "/src/assets/images/redesign_baja_desert_1795499980543.jpg",
    palette: [
      { hex: "#4A5238", label: "Olive Drab Matte" },
      { hex: "#A3A6A8", label: "Brushed Raw Steel" },
      { hex: "#B8844A", label: "Saddle Tan Suede" },
      { hex: "#1B1B1A", label: "Ceramic Exhaust Black" },
    ],
    specs: {
      wheelFront: "21 × 1.85 (90/90-21 Dual-Sport)",
      wheelRear: "18 × 2.15 (120/90-18 Dual-Sport)",
      seatHeightMm: 845,
      groundClearanceMm: 265,
      rakeDeg: "28.0°",
      sprocket: "14T / 48T (Rantai 428 O-Ring)",
      weightEstimateKg: 123,
      budgetRangeIdr: "Rp 18 – 24 Juta",
    },
    deltasFromReferenceId: [
      "Tangki krem diganti tangki baja brushed dua warna hijau zaitun dengan garis emas tipis khas era Baja 1974.",
      "Jok kulit cokelat mengilap diganti suede tan pendek gaya desert tracker agar buritan spatbor aluminium pendek terlihat agresif.",
      "Spatbor depan & belakang diganti pelat aluminium roll manual tanpa cat dengan karet sokbreker lebih panjang.",
      "Setang krom lebar berpalang dilengkapi bantalan kulit jahitan tangan serta gril pelindung lampu kaca kuning.",
    ],
    deltasFromReferenceEn: [
      "Replaces the cream tank with a brushed steel & olive-drab teardrop tank accented by a hand-laid gold pinstripe.",
      "Swaps glossy leather for a shorter saddle-tan suede tracker pad, exposing the hand-rolled aluminum bobbed rear fender.",
      "Uses raw hand-rolled aluminum high fenders front and rear with extended fork gaiters.",
      "Adds a wide braced chrome desert bar with hand-stitched leather crossbar pad and stone-guarded yellow rally lamp.",
    ],
    hotspots: [
      {
        id: "baja-tank",
        number: 1,
        x: 52,
        y: 30,
        partId: "Tangki Baja Brushed & Olive Drab",
        partEn: "Brushed Steel & Olive Tank",
        gsxAdaptationId:
          "Lekukan lutut (knee-dent) dibuat ulang agar pas dengan sudut rangka twin-spar atas GSX-S150 dan tetap menampung selang balik EFI.",
        gsxAdaptationEn:
          "Hand-beaten knee dents clear the GSX-S150 upper frame rails while retaining internal baffles around the EFI fuel pump.",
        fabricationSpec: "Clear coat satin anti-bensin · Emblem SUZUKI timbul",
      },
      {
        id: "baja-bar",
        number: 2,
        x: 65,
        y: 12,
        partId: "Setang Desert Braced + Pad Kulit",
        partEn: "Braced Desert Bar + Leather Pad",
        gsxAdaptationId:
          "Kabel kopling dan kabel gas GSX-S150 diganti jalur lebih panjang (+10cm) agar sudut belok penuh tetap ringan.",
        gsxAdaptationEn:
          "Throttle and clutch cables are extended by 100mm for full steering lock clearance with the wide 790mm desert bar.",
        fabricationSpec: "Lebar 790mm · Rise 110mm · Pad kulit nabati",
      },
      {
        id: "baja-fender",
        number: 3,
        x: 79,
        y: 34,
        partId: "Spatbor Aluminium Roll Manual",
        partEn: "Hand-Rolled Alloy High Fender",
        gsxAdaptationId:
          "Dipasang di segitiga bawah dengan jarak aman agar tidak menghalangi aliran udara masuk ke kisi radiator GSX-S150.",
        gsxAdaptationEn:
          "Mounted to the lower triple clamp with ventilated rear cutaways so airflow to the GSX radiator remains unobstructed.",
        fabricationSpec: "Aluminium 5052 tebal 2mm · Finishing hair-line brushed",
      },
      {
        id: "baja-skid",
        number: 4,
        x: 50,
        y: 69,
        partId: "Bash Plate Pelindung Mesin & Leher",
        partEn: "Heavy-Duty Sump & Header Guard",
        gsxAdaptationId:
          "Mengikat langsung ke dudukan mesin depan dan bawah GSX-S150 untuk melindungi bak oli aluminium dari hantaman batu gurun.",
        gsxAdaptationEn:
          "Bolts directly to lower GSX engine cradle lugs to shield the cast crankcase and oil filter housing from rock impacts.",
        fabricationSpec: "Aluminium 4.5mm · Lubang pendinginan CNC",
      },
      {
        id: "baja-seat",
        number: 5,
        x: 33,
        y: 32,
        partId: "Jok Solo Suede Tahan Air",
        partEn: "Weatherproof Tan Suede Solo Seat",
        gsxAdaptationId:
          "Baseplate fiberglass mengikuti kontur subframe baru sekaligus menyembunyikan aki kering dan modul ECU GSX-S150 di kotak bawah jok.",
        gsxAdaptationEn:
          "Fiberglass pan contours the new loop subframe while concealing the battery box and OEM Suzuki ECU underneath.",
        fabricationSpec: "Suede sintetis anti-UV · Panjang jok 520mm",
      },
      {
        id: "baja-pipe",
        number: 6,
        x: 24,
        y: 44,
        partId: "Knalpot Megaphone Matte Ceramic",
        partEn: "Ceramic-Coated Megaphone Pipe",
        gsxAdaptationId:
          "Dilengkapi port sensor O2 M12 bawaan GSX-S150 pada leher knalpot agar campuran bahan bakar injeksi tetap ideal.",
        gsxAdaptationEn:
          "Retains the OEM M12 O2 sensor bung near the exhaust port so stock GSX-S150 EFI fueling stays crisp.",
        fabricationSpec: "Lapisan ceramic tahan panas 900°C · DB-killer lepas-pasang",
      },
    ],
  },
  {
    id: "dakar-rally",
    code: "03",
    yearEra: "1982",
    nameId: "1982 DR-150 Paris-Dakar Rally",
    nameEn: "1982 DR-150 Paris-Dakar Rally",
    taglineId: "Siluet reli jarak jauh klasik dengan fairing kembar dan tangki 14L.",
    taglineEn: "Classic long-distance rally silhouette with twin lamps and 14L tank.",
    inspiration: "Suzuki DR500 / DR-Z Paris-Dakar (1982)",
    terrainFocusId: "Ekspedisi Lintas Pulau & Rally Gravel",
    terrainFocusEn: "Long-Range Expedition & Rally Raid",
    image: "/src/assets/images/redesign_dakar_rally_1795499980382.jpg",
    palette: [
      { hex: "#F3F2EE", label: "Rally Pearl White" },
      { hex: "#1D4ED8", label: "Suzuki Factory Blue" },
      { hex: "#DC2626", label: "Team Red Block" },
      { hex: "#C2922D", label: "Dakar Gold Rim" },
    ],
    specs: {
      wheelFront: "21 × 1.60 (90/90-21 Rally)",
      wheelRear: "18 × 2.50 (120/80-18 Rally)",
      seatHeightMm: 875,
      groundClearanceMm: 280,
      rakeDeg: "27.0°",
      sprocket: "15T / 47T (Top Speed & Torsi Seimbang)",
      weightEstimateKg: 129,
      budgetRangeIdr: "Rp 24 – 32 Juta",
    },
    deltasFromReferenceId: [
      "Tangki kompak diganti tangki rally besar 14 liter berbalut grafis blok biru-merah putih era reli 1982 untuk daya jelajah 450+ km.",
      "Lampu bulat tunggal diganti fairing rally putih klasik dengan lampu kembar berpelindung kawat serta visor angin bening.",
      "Ditambahkan handguard putih, side panel balap #21 terpadu, serta jok gripper biru yang naik menyatu ke belakang tangki.",
      "Skid plate diperbesar menutup penuh sisi depan bawah mesin & selang radiator.",
    ],
    deltasFromReferenceEn: [
      "Upgrades fuel capacity to a sculpted 14L vintage rally tank in 1982 Suzuki factory white/blue/red block livery.",
      "Replaces the single round lamp with a compact twin-headlight rally cowl, stone grille, and clear rally windscreen.",
      "Adds vintage white handguards, #21 integrated side number plates, and a tank-hugging royal blue gripper rally seat.",
      "Expands the aluminum sump guard higher up the downtubes to shield lower radiator hoses.",
    ],
    hotspots: [
      {
        id: "dakar-fairing",
        number: 1,
        x: 69,
        y: 23,
        partId: "Fairing Rally Twin-Round & Visor",
        partEn: "Twin-Lamp Rally Cowl & Screen",
        gsxAdaptationId:
          "Dipasang ke rangka utama (frame-mounted) via braket leher komstir GSX sehingga bobot fairing tidak membebani setang saat berbelok di pasir.",
        gsxAdaptationEn:
          "Frame-mounted to the GSX steering head tube so fairing weight never pulls on the handlebars in deep sand.",
        fabricationSpec: "Fiberglass komposit 3-lapis · Visor akrilik 3mm",
      },
      {
        id: "dakar-tank",
        number: 2,
        x: 53,
        y: 30,
        partId: "Tangki Rally 14 Liter (450+ km)",
        partEn: "14L Long-Range Rally Tank",
        gsxAdaptationId:
          "Menggunakan konsumsi irit mesin injeksi GSX-S150 (±38 km/L), tangki 14L ini sanggup menempuh ekspedisi jauh tanpa jerigen tambahan.",
        gsxAdaptationEn:
          "Paired with the efficient GSX-S150 EFI engine (~38 km/L), 14L capacity delivers 450+ km expedition range.",
        fabricationSpec: "Kapasitas 14L · Tutup tangki alloy drat ulir cepat",
      },
      {
        id: "dakar-seat",
        number: 3,
        x: 34,
        y: 32,
        partId: "Jok Gripper Biru Sambung Tangki",
        partEn: "Tank-Hugging Blue Gripper Seat",
        gsxAdaptationId:
          "Busa berlapis anti-slip memudahkan perpindahan bobot tubuh maju-mundur tanpa mengorbankan kenyamanan duduk touring.",
        gsxAdaptationEn:
          "Ribbed marine-vinyl gripper cover allows effortless weight shifts while staying comfortable on tarmac liaisons.",
        fabricationSpec: "Lebar 210mm · Ketebalan busa 75mm",
      },
      {
        id: "dakar-side",
        number: 4,
        x: 28,
        y: 41,
        partId: "Panel Samping #21 & Box Filter",
        partEn: "#21 Side Panels & Airbox Cover",
        gsxAdaptationId:
          "Menutup rapi kotak filter udara custom atau filter busa dual-stage anti-debu untuk jalur berpasir.",
        gsxAdaptationEn:
          "Shields a high-flow dual-stage foam airbox conversion designed for dusty off-road conditions.",
        fabricationSpec: "ABS thermoformed / Alloy · Baut quick-release Dzus",
      },
      {
        id: "dakar-sump",
        number: 5,
        x: 51,
        y: 66,
        partId: "Sump Guard Tinggi Perlindungan Penuh",
        partEn: "Full-Height Rally Sump Guard",
        gsxAdaptationId:
          "Menutup hingga leher pipa dan bagian bawah radiator agar aman dari lontaran kerikil ban depan 21 inci.",
        gsxAdaptationEn:
          "Extends high enough to block roost and stones thrown by the 21-inch knobby front wheel toward the radiator.",
        fabricationSpec: "Aluminium 5mm las TIG · Dudukan karet peredam getar",
      },
      {
        id: "dakar-exhaust",
        number: 6,
        x: 22,
        y: 46,
        partId: "Silencer Titanium-Finish High Mount",
        partEn: "Titanium-Finish Rally Silencer",
        gsxAdaptationId:
          "Saluran buang berukuran presisi menjaga torsi putaran bawah-menengah DOHC 150cc tetap padat.",
        gsxAdaptationEn:
          "Stepped stainless header preserves mid-range torque of the high-revving 150cc DOHC single.",
        fabricationSpec: "Header 28mm→35mm · Silencer oval slip-on",
      },
    ],
  },
  {
    id: "isdt-trials",
    code: "04",
    yearEra: "1976",
    nameId: "1976 ISDT Six Days Trials",
    nameEn: "1976 ISDT Six Days Trials",
    taglineId: "Minimalisme ringan tangki aluminium mentah, rak besi, dan ban trials.",
    taglineEn: "Featherweight minimalism with raw alloy tank, rear rack, and trials tires.",
    inspiration: "1976 ISDT Vintage Trail & Trials",
    terrainFocusId: "Jalur Teknis Berbatu & Dual-Purpose Ringan",
    terrainFocusEn: "Technical Rock Trails & Light Dual-Sport",
    image: "/src/assets/images/redesign_isdt_trials_1795499981314.jpg",
    palette: [
      { hex: "#C8CACD", label: "Raw Brushed Alloy" },
      { hex: "#8B1E24", label: "ISDT Crimson Stripe" },
      { hex: "#1C1C1B", label: "Satin Frame Black" },
      { hex: "#D6D8DA", label: "Silver Alloy Rim" },
    ],
    specs: {
      wheelFront: "21 × 1.60 (2.75-21 Trials Block)",
      wheelRear: "18 × 2.15 (4.00-18 Trials Block)",
      seatHeightMm: 830,
      groundClearanceMm: 260,
      rakeDeg: "26.5°",
      sprocket: "13T / 49T (Torsi Putaran Bawah Maksimal)",
      weightEstimateKg: 117,
      budgetRangeIdr: "Rp 21 – 28 Juta",
    },
    deltasFromReferenceId: [
      "Tangki cat penuh diganti tangki aluminium hand-formed super ramping dengan aksen garis merah tua dan emblem Suzuki klasik.",
      "Jok panjang diganti pad trials pendek berbahan kulit hitam + rak besi tubular di atas spatbor aluminium belakang.",
      "Knalpot hitam gemuk dipangkas menjadi pipa stainless ramping yang menempel sangat rapat ke rangka.",
      "Ban pacul kasar diganti pola kotak Trials (block pattern) di pelek silver 21\"/18\" yang lebih lincah di aspal maupun batu licin.",
    ],
    deltasFromReferenceEn: [
      "Replaces the painted tank with an ultra-slim hand-formed brushed aluminum tank featuring a crimson racing stripe.",
      "Swaps the long bench for a compact solo trials leather saddle paired with a tubular steel rear luggage rack.",
      "Replaces the bulky black pipe with a tight-tucked brushed stainless muffler following the trellis line.",
      "Fits classic trials block-pattern tires on silver spoked 21\"/18\" rims for balanced rock traction and tarmac manners.",
    ],
    hotspots: [
      {
        id: "isdt-tank",
        number: 1,
        x: 52,
        y: 30,
        partId: "Tangki Aluminium Hand-Formed 7L",
        partEn: "7L Hand-Formed Alloy Tank",
        gsxAdaptationId:
          "Bobot tangki hanya ±1.9 kg (jauh lebih ringan dari tangki besi), menurunkan titik berat atas GSX-S150 secara signifikan.",
        gsxAdaptationEn:
          "Weighs just ~1.9 kg, shaving top-heavy mass off the GSX-S150 chassis for nimble low-speed trail balance.",
        fabricationSpec: "Aluminium 3003 tebal 2mm · Finishing raw brushed + clear matte",
      },
      {
        id: "isdt-rack",
        number: 2,
        x: 19,
        y: 31,
        partId: "Rak Belakang Tubular & Jok Trials",
        partEn: "Tubular Rear Rack & Solo Pad",
        gsxAdaptationId:
          "Rak menyatu langsung ke loop subframe belakang untuk mengikat tas perkakas atau dry-bag ekspedisi ringan.",
        gsxAdaptationEn:
          "Integrated steel rack welds cleanly to the rear loop for strapping tool rolls or compact dry bags.",
        fabricationSpec: "Pipa 16mm · Beban statis hingga 12 kg",
      },
      {
        id: "isdt-exhaust",
        number: 3,
        x: 25,
        y: 44,
        partId: "Knalpot Stainless Tight-Tuck",
        partEn: "Tight-Tuck Stainless Exhaust",
        gsxAdaptationId:
          "Pipa dilekuk rapat di sisi dalam garis rangka agar kaki pengendara tidak mudah menyenggol knalpot saat manuver berdiri.",
        gsxAdaptationEn:
          "Tucked tightly inside the frame plane so riders can stand and dab freely without calf heat contact.",
        fabricationSpec: "Stainless 304 las cacing (pie-cut) · Tanpa silencer besar",
      },
      {
        id: "isdt-lamp",
        number: 4,
        x: 70,
        y: 25,
        partId: "Lampu Krom 5\" + Braket CNC",
        partEn: "5\" Chrome Lamp + Billet Ears",
        gsxAdaptationId:
          "Kupingan lampu aluminium CNC mengapit as sokbreker 31mm–37mm dengan lampu LED reflektor klasik berpelindung kawat.",
        gsxAdaptationEn:
          "CNC-milled alloy headlight ears clamp onto the stanchions, housing a compact stone-guarded 5\" reflector lamp.",
        fabricationSpec: "Aluminium billet 6061 · LED H4 warm-white 4300K",
      },
      {
        id: "isdt-radiator",
        number: 5,
        x: 61,
        y: 44,
        partId: "Pelindung Radiator & Shroud Minimalis",
        partEn: "Minimalist Radiator Guard",
        gsxAdaptationId:
          "Mempertahankan kipas pendingin elektrik OEM GSX-S150 agar mesin DOHC tidak overheat saat merayap pelan di jalur teknis.",
        gsxAdaptationEn:
          "Retains the OEM GSX-S150 electric thermo-fan so the DOHC engine never overheats during slow technical climbs.",
        fabricationSpec: "Grill stainless 1.5mm · Selang silikon tahan panas",
      },
      {
        id: "isdt-tires",
        number: 6,
        x: 78,
        y: 72,
        partId: "Pelek Silver 21\"/18\" & Ban Trials",
        partEn: "Silver 21\"/18\" Rims & Trials Tires",
        gsxAdaptationId:
          "Kombinasi gir 13T/49T memberi torsi instan untuk melewati tanjakan batu tanpa mengorbankan kenyamanan aspal.",
        gsxAdaptationEn:
          "13T/49T gearing unlocks instant low-RPM pull on steep rock steps while trials tread stays smooth on pavement.",
        fabricationSpec: "Ban 2.75-21 & 4.00-18 · Pelek silver anodized",
      },
    ],
  },
];

export interface StockVsDirtRow {
  parameterId: string;
  parameterEn: string;
  stockGsx: string;
  vintageDirt: string;
  noteId: string;
  noteEn: string;
}

export const STOCK_VS_DIRT_MATRIX: StockVsDirtRow[] = [
  {
    parameterId: "Basis Mesin",
    parameterEn: "Engine Architecture",
    stockGsx: "147.3cc DOHC 4-Katup, Liquid-Cooled, 6-Speed",
    vintageDirt: "Tetap 147.3cc DOHC + Remap ECU & Knalpot High-Mount",
    noteId: "Tenaga 19.1 PS dipertahankan, torsi bawah diperkuat via rasio gir.",
    noteEn: "Retains 19.1 PS peak while boosting low-end pull via final gearing.",
  },
  {
    parameterId: "Roda & Ban",
    parameterEn: "Wheels & Tires",
    stockGsx: "17\" Cast Wheel (90/80-17 & 130/70-17)",
    vintageDirt: "21\" Depan / 18\" Belakang Jari-Jari (Knobby / Trials)",
    noteId: "Wajib ubah tromol + boshing as roda & perpanjang swingarm ±40mm.",
    noteEn: "Requires spoke hub conversion, custom spacers & +40mm swingarm stretch.",
  },
  {
    parameterId: "Rasio Gir Final",
    parameterEn: "Final Drive Gearing",
    stockGsx: "15T / 45T (Rasio 3.00)",
    vintageDirt: "14T / 49T s/d 13T / 50T (Rasio 3.50–3.85)",
    noteId: "Kompensasi diameter roda 18\" dan kebutuhan menanjak jalur tanah.",
    noteEn: "Compensates for 18\" rear tire circumference & steep off-road climbs.",
  },
  {
    parameterId: "Ground Clearance",
    parameterEn: "Ground Clearance",
    stockGsx: "155 mm",
    vintageDirt: "260 – 280 mm",
    noteId: "Knalpot kolong GSX wajib dipindah ke atas + pasang skid plate 4mm.",
    noteEn: "Underbelly GSX exhaust relocated high + 4mm alloy skid plate fitted.",
  },
  {
    parameterId: "Tinggi Jok",
    parameterEn: "Seat Height",
    stockGsx: "785 mm",
    vintageDirt: "830 – 875 mm",
    noteId: "Subframe belakang dipotong & dilas ulang lebih datar dan tinggi.",
    noteEn: "OEM rear subframe cut & re-fabricated flatter and higher.",
  },
  {
    parameterId: "Tangki & Fuel Pump",
    parameterEn: "Tank & EFI Pump",
    stockGsx: "11L Cover Plastik (Pompa Bensin In-Tank)",
    vintageDirt: "7L – 14L Tangki Besi/Alloy Custom + Flange OEM",
    noteId: "Pelat dudukan pompa bensin EFI wajib dicangkok ke dasar tangki baru.",
    noteEn: "OEM EFI pump flange must be welded cleanly into the custom tank floor.",
  },
  {
    parameterId: "Suspensi Depan",
    parameterEn: "Front Suspension",
    stockGsx: "Teleskopik 31mm Travel 110mm",
    vintageDirt: "Teleskopik 37–41mm / As Panjang + Karet Gaiter (Travel 185mm+)",
    noteId: "Disarankan substitusi set segitiga & as sok KLX/TS/Byson agar rigid.",
    noteEn: "Recommended triple clamp & fork swap (37–41mm) for off-road rigidity.",
  },
];
