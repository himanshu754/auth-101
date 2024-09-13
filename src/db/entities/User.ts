import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import {
    PermissionEnum, RoleEnum, UserStatusEnum,
} from "enums/auth.enum";
import { getHash } from "helpers/authUtils/bcryptUtils";

@Entity()
class User {

    @PrimaryGeneratedColumn()
    idUserInt: number;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column("varchar", {
        length: 50, nullable: true,
    })
    mobile: string;

    @Column({ nullable: true })
    profilePic: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @Column({ default: false })
    isPasswordCreated: boolean;

    @Column({ type: "int" })
    idOrg: number;

    @Column({ nullable: true })
    passwordHash: string;

    @Column("simple-enum", {
        default: UserStatusEnum.Active,
        enum: UserStatusEnum,
    })
    status: UserStatusEnum;

    @Column(
        "simple-enum", {
            default: PermissionEnum.fullAccess,
            enum: PermissionEnum,
        })
    permission: PermissionEnum;

    @Column(
        "simple-enum", {
            default: RoleEnum.owner,
            enum: RoleEnum,
        })
    role: RoleEnum;

    @Column({ nullable: true })
    resetToken: string;

    @Column({
        type: "varchar", nullable: true,
    })
    vatNo: string;

    @Column({
        type: "varchar", nullable: true,
    })
    taxId: string;

    @Column({
        type: "varchar", nullable: true,
    })
    companyName: string;

    @Column({
        type: "boolean", nullable: true,
    })
    marketingConsent: boolean;

    @Column({
        type: "boolean", nullable: true,
    })
    termsAndConditions: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async beforeInsert() {
        if (this.passwordHash) {
            this.passwordHash = await getHash(this.passwordHash);
        }
    }
}

export {
    User,
};
