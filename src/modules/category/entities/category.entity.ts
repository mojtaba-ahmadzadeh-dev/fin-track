import { BaseEntity } from "../../../common/abstracts/base.entity";
import { EntityName } from "../../../common/enum/entity.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntity {
  @Column({
    type: "varchar",
    length: 255,
  })
  title: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  slug: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "parentId" })
  parent?: CategoryEntity;

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];
}
