import { AngularFirestore } from "@angular/fire/compat/firestore";

export class JaratGenerator {
  private indul: string;
  private honnan: string;
  private hova: string;
  private helyek: string;
  private ar: string;

  constructor();
  constructor(indul: string, honnan: string, hova: string, helyek: string, ar?: string);
  constructor(indul: string = '', honnan: string = '', hova: string = '', helyek: string = '', ar: string = '50') {
    this.indul = indul;
    this.honnan = honnan;
    this.hova = hova;
    this.helyek = helyek;
    this.ar = ar;
  }

  public getIndul(): string {
    return this.indul;
  }

  public setIndul(indul: string): void {
    this.indul = indul;
  }

  public getHonnan(): string {
    return this.honnan;
  }

  public setHonnan(honnan: string): void {
    this.honnan = honnan;
  }

  public getHova(): string {
    return this.hova;
  }

  public setHova(hova: string): void {
    this.hova = hova;
  }

  public getHelyek(): string {
    return this.helyek;
  }

  public setHelyek(helyek: string): void {
    this.helyek = helyek;
  }

  public getAr(): string {
    return this.ar;
  }

  public setAr(ar: string): void {
    this.ar = ar;
  }

  public static general(): JaratGenerator[] {
    const hungarianCities = ["Budapest", "Békéscsaba", "Cegléd", "Dunaújváros", "Eger", "Győr", "Kaposvár", "Kecskemét", "Komárom", "Miskolc", "Nagykanizsa", "Nyíregyháza", "Pécs", "Siófok", "Sopron", "Szeged", "Székesfehérvár", "Szolnok", "Szombathely", "Tatabánya", "Zalaegerszeg"];

    const indultomb: string[] = [];
    const honnantomb: string[] = [];
    const hovatomb: string[] = [];
    const helyektomb: string[] = [];
    const artomb: string[] = [];

    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

    for (let i = 0; i < hungarianCities.length; i++) {
      for (let j = 0; j < hungarianCities.length; j++) {
        for (let h = 0; h < 4; h++) {
          if (i !== j) {
            const hour = 6 + random(0, 5) * h;
            const hourString = `${hour}:00`;
            const honnanCity = hungarianCities[i];
            const hovaCity = hungarianCities[j];
            const helyekString = `${random(400, 4000)}`;

            indultomb.push(hourString);
            honnantomb.push(honnanCity);
            hovatomb.push(hovaCity);
            helyektomb.push(helyekString);
            artomb.push("50");
          }
        }
      }
    }

    const jaratok: JaratGenerator[] = [];
    for (let i = 0; i < indultomb.length; i++) {
      const j = new JaratGenerator(indultomb[i], honnantomb[i], hovatomb[i], helyektomb[i], artomb[i]);
      jaratok.push(j);
    }
    return jaratok;
  }

  public static async uploadToFirestore(firestore: AngularFirestore): Promise<void> {
    const jaratok = JaratGenerator.general();
    const batch = firestore.firestore.batch();
    const jaratokCollection = firestore.collection('Jaratok').ref;

    jaratok.forEach(jarat => {
      const docRef = jaratokCollection.doc();
      batch.set(docRef, {
        indul: jarat.getIndul(),
        honnan: jarat.getHonnan(),
        hova: jarat.getHova(),
        helyek: jarat.getHelyek(),
        ar: jarat.getAr()
      });
    });

    await batch.commit();
    console.log('Jaratok successfully uploaded to Firestore');
  }
}
