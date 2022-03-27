import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity()
@Index(['level', 'userId'], { unique: true })
export class Level {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'integer' })
  public level: number;

  @Column({ type: 'integer' })
  public userId: number;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date;
}
