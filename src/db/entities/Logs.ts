
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { logTypeEnum } from "enums/log.enum";

@Entity()
class Logs {
    @PrimaryGeneratedColumn()
    idLogs: number;

    @Column({ //meta,google
        type: "varchar", nullable: true,
    })
    mediaChannel: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    action: string;//affected item for ui - campaign management,user management rule management

    @Column({ type: "varchar" })
    message: string;//rule - 1% budget increased, user added by this user for role

    @Column({
        type: "varchar", nullable: true,
    }) //brief message- 2 or 3 words
    logEvent: string;

    @Column({
        type: "varchar", nullable: true,
    })
    logType: string;//campaign,rule,ad

    @Column({
        type: "int",
        nullable: true,
    })
    logTypeId: number;//campaignid,ruleid

    @Column("simple-enum", {
        enum: logTypeEnum,
        default: logTypeEnum.Success,
    })
    logStatus: logTypeEnum;//mainCondition

    @Column({
        type: "int",
        nullable: true,
    })
    orgId: number;

    @Column({
        type: "int", nullable: true,
    })
    updateBy: number;

    @Column({
        type: "int",
        nullable: true,
    })
    projectId: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}

export {
    Logs,
};
