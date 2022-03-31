import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum WanikaniType {
  Vocabulary = 'vocabulary',
  Kanji = 'kanji',
  Radical = 'radical',
}

@Entity()
export class Wanikani {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer', nullable: true })
  public wanikaniId: number | null;

  @Column({ type: 'enum', enum: WanikaniType })
  public type: WanikaniType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public slug: string | null;

  @Column({ type: 'integer', nullable: true })
  public level: number;

  @Column({ type: 'varchar', length: 255 })
  public characters: string;

  @Column({ type: 'varchar', length: 255, array: true })
  public meanings: string[];

  @Column({ type: 'varchar', length: 255, array: true })
  public readings: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  public audio: string | null;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
