"""Initial migration.

Revision ID: 7147936bd098
Revises: 
Create Date: 2024-09-15 16:05:17.002046

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7147936bd098'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('faq',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('faq')
    # ### end Alembic commands ###
