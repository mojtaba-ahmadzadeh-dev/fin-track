import { EntityName } from "../../../common/enum/entity.enum";
import { BaseEntity } from "../../../common/abstracts/base.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntity {
  @Column()
  title: string;
  @Column({ unique: true })
  slug: string;
  @Column()
  image: string;
  @Column({ nullable: true })
  imageKey: string;
  @Column()
  show: boolean;
  @Column({ nullable: true })
  parentId: number;
  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    onDelete: "CASCADE",
  })
  parent: CategoryEntity;
  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity;
}
